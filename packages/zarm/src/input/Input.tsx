import { createBEM } from '@zarm-design/bem';
import { CloseCircleFill } from '@zarm-design/icons';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { useControllableEventValue } from '../utils/hooks';
import { resolveOnChange } from '../utils/resolveOnChange';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseInputTextareaProps, BaseInputTextProps, InputCssVars } from './interface';
import { countSymbols } from './utils';

export type InputTextProps = BaseInputTextProps &
  HTMLProps<InputCssVars> &
  React.InputHTMLAttributes<HTMLInputElement>;

export type InputTextareaProps = BaseInputTextareaProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  HTMLProps<InputCssVars>;

export type InputProps = {
  type?: string;
} & (InputTextProps | InputTextareaProps);

export interface InputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  nativeElement: HTMLInputElement | HTMLTextAreaElement | null;
}

const Input = React.forwardRef<unknown, InputProps>((props, ref) => {
  const {
    type,
    disabled,
    autoFocus,
    readOnly,
    clearable,
    showLength,
    autoHeight,
    rows,
    className,
    style,
    maxLength,
    label,
    defaultValue = '',
    onChange,
    onBlur,
    onFocus,
    ...restProps
  } = props as InputTextProps & InputTextareaProps;

  const wrapperRef = (ref as any) || React.createRef<HTMLDivElement>();
  const inputRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>();

  const [value, setValue] = useControllableEventValue({ ...props, defaultValue });
  const [focused, setFocused] = React.useState<boolean>(autoFocus!);
  const isTextarea = type === 'text' && 'rows' in props;
  let blurFromClear = false;
  let blurTimeout: number;

  const showClearIcon =
    clearable && !readOnly && !disabled && typeof value !== 'undefined' && value?.length > 0;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('input', { prefixCls });

  const cls = bem([
    {
      textarea: isTextarea,
      disabled,
      clearable: showClearIcon,
      readonly: readOnly,
      focus: focused,
    },
    className,
  ]);

  const focus = () => {
    inputRef.current!.focus();
  };

  const blur = () => {
    inputRef.current!.blur();
  };

  const clear = () => {
    onInputClear(new Event('click'));
  };

  const onInputBlur = (e) => {
    blurTimeout = window.setTimeout(() => {
      if (!blurFromClear && document.activeElement !== inputRef.current) {
        setFocused(false);

        onBlur?.(e);
      }
      blurFromClear = false;
    }, 200);
  };

  const onInputFocus = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const onInputChange = (e) => {
    setValue(e);
  };

  const onInputClear = (e) => {
    blurFromClear = true;
    resolveOnChange(inputRef.current, e, setValue);
    focus();
  };

  // 渲染文字长度
  const textLengthRender = showLength && maxLength && (
    <div className={bem('length')}>{`${countSymbols(value)}/${maxLength}`}</div>
  );

  const commonProps: InputTextProps & InputTextareaProps = {
    ...restProps,
    maxLength,
    disabled,
    autoFocus,
    readOnly,
    value,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
    onChange: onInputChange,
  };

  // 渲染输入框
  const inputRender = isTextarea ? (
    <>
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        {...(commonProps as React.HTMLAttributes<HTMLTextAreaElement>)}
        rows={rows}
      />
      {textLengthRender}
    </>
  ) : (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      {...(commonProps as React.HTMLAttributes<HTMLInputElement>)}
      type={type}
    />
  );

  // 渲染文本内容
  const textRender = <div className={bem('content')}>{value}</div>;

  // 渲染标签栏
  const labelRender = !!label && <div className={bem('label')}>{label}</div>;

  // 渲染清除按钮
  const clearIconRender = showClearIcon && (
    <CloseCircleFill className={bem('clear')} onClick={onInputClear} />
  );

  React.useImperativeHandle(wrapperRef, () => ({
    focus,
    blur,
    clear,
    get nativeElement() {
      return inputRef.current;
    },
  }));

  React.useEffect(() => {
    if (!autoHeight) return;

    inputRef.current!.style.height = 'auto';
    inputRef.current!.scrollTop = 0;
    inputRef.current!.style.height = `${inputRef.current!.scrollHeight}px`;

    if (readOnly && rows) {
      inputRef.current!.style.height = `${inputRef.current!.scrollHeight * rows}px`;
    }
  }, [autoHeight, readOnly, rows, value]);

  React.useEffect(() => {
    return () => {
      !!blurTimeout && clearTimeout(blurTimeout);
    };
  });

  return (
    <div ref={wrapperRef} className={cls} style={style}>
      {labelRender}
      {!readOnly ? inputRender : textRender}
      {clearIconRender}
    </div>
  );
});

Input.displayName = 'Input';

Input.defaultProps = {
  type: 'text',
  disabled: false,
  autoFocus: false,
  readOnly: false,
  clearable: false,
  showLength: false,
  autoHeight: false,
};

export default Input;
