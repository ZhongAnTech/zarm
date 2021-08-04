import * as React from 'react';
import classnames from 'classnames';
import { CloseCircleFill } from '@zarm-design/icons';
import { getValue } from './utils';
import { ConfigContext } from '../n-config-provider';
import type { BaseInputTextProps, BaseInputTextareaProps } from './interface';

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

const countSymbols = (text = '') => {
  return text.replace(regexAstralSymbols, '_').length;
};

export interface InputTextProps
  extends BaseInputTextProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  prefixCls?: string;
}

export type InputTextareaProps = BaseInputTextareaProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputProps = {
  type?: string;
} & (InputTextProps | InputTextareaProps);

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
    value,
    defaultValue,
    maxLength,
    onChange,
    onBlur,
    onFocus,
    ...restProps
  } = props as InputTextProps & InputTextareaProps;

  const wrapperRef = (ref as any) || React.createRef<HTMLDivElement>();
  const inputRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>();

  const [currentValue, setCurrentValue] = React.useState(getValue({ value, defaultValue }, ''));
  const [focused, setFocused] = React.useState<boolean>(autoFocus!);

  const isTextarea = type === 'text' && 'rows' in props;
  let blurFromClear = false;
  let blurTimeout: number;

  const showClearIcon =
    clearable &&
    !readOnly &&
    !disabled &&
    typeof value !== 'undefined' &&
    typeof onChange !== 'undefined' &&
    currentValue.length > 0;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-input`;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--textarea`]: isTextarea,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--clearable`]: showClearIcon,
    [`${prefixCls}--readonly`]: readOnly,
    [`${prefixCls}--focus`]: focused,
  });

  const focus = () => {
    inputRef.current!.focus();
  };

  const blur = () => {
    inputRef.current!.blur();
  };

  const onInputBlur = (e) => {
    blurTimeout = window.setTimeout(() => {
      if (!blurFromClear && document.activeElement !== inputRef.current) {
        setFocused(false);

        if (typeof onBlur === 'function') {
          onBlur(e);
        }
      }
      blurFromClear = false;
    }, 200);
  };

  const onInputFocus = (e) => {
    setFocused(true);

    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  };

  const onInputChange = (e) => {
    setCurrentValue(e.target.value);

    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  const onInputClear = (e) => {
    blurFromClear = true;
    setCurrentValue('');
    focus();

    if (typeof onChange !== 'function') {
      return;
    }

    const event = Object.create(e);
    const target = inputRef.current!;
    const originalValue = target.value;

    event.target = target;
    event.currentTarget = target;
    target.value = '';
    onChange(event);
    // reset target ref value
    target.value = originalValue;
  };

  const commonProps: InputTextProps & InputTextareaProps = {
    ...restProps,
    maxLength,
    disabled,
    autoFocus,
    readOnly,
    defaultValue,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
  };

  if ('value' in props) {
    commonProps.value = currentValue;
  }
  if ('onChange' in props) {
    commonProps.onChange = onInputChange;
  }

  // 渲染输入框
  const renderInput = isTextarea ? (
    <textarea
      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
      {...(commonProps as React.HTMLAttributes<HTMLTextAreaElement>)}
      rows={rows}
    />
  ) : (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      {...(commonProps as React.HTMLAttributes<HTMLInputElement>)}
      type={type}
    />
  );

  // 渲染文本内容
  const renderText = <div className={`${prefixCls}__content`}>{currentValue}</div>;

  // 渲染文字长度
  const renderTextLength = showLength && maxLength && (
    <div className={`${prefixCls}__length`}>{`${countSymbols(currentValue)}/${maxLength}`}</div>
  );

  // 渲染清除按钮
  const renderClearIcon = showClearIcon && (
    <CloseCircleFill className={`${prefixCls}__clear`} onClick={onInputClear} />
  );

  React.useImperativeHandle(wrapperRef, () => ({
    focus,
    blur,
  }));

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue }));
  }, [value, defaultValue]);

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
      {!readOnly ? renderInput : renderText}
      {renderTextLength}
      {renderClearIcon}
    </div>
  );
});

Input.displayName = 'Input';

Input.defaultProps = {
  type: 'text',
  disabled: false,
  autoFocus: false,
  readOnly: false,
  clearable: true,
  showLength: false,
  autoHeight: false,
};

export default Input;
