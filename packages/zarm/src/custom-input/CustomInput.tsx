import { createBEM } from '@zarm-design/bem';
import { CloseCircleFill } from '@zarm-design/icons';
import { useControllableValue } from 'ahooks';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import KeyboardPicker from '../keyboard-picker';
import useClickAway from '../use-click-away';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseCustomInputProps } from './interface';

export interface CustomInputCssVars {
  '--height'?: React.CSSProperties['height'];
  '--line-height'?: React.CSSProperties['lineHeight'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
  '--background'?: React.CSSProperties['background'];
  '--label-font-size'?: React.CSSProperties['fontSize'];
  '--placeholder-color'?: React.CSSProperties['color'];
  '--disabled-color'?: React.CSSProperties['color'];
  '--clear-icon-size'?: React.CSSProperties['width'];
  '--clear-icon-color'?: React.CSSProperties['color'];
  '--cursor-height'?: React.CSSProperties['height'];
  '--cursor-width'?: React.CSSProperties['width'];
  '--cursor-color'?: React.CSSProperties['color'];
}

export type CustomInputProps = BaseCustomInputProps &
  HTMLProps<CustomInputCssVars> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'onFocus' | 'onBlur'>;

export interface CustomInputRef {
  focus: () => void;
  blur: () => void;
}

const CustomInput = React.forwardRef<CustomInputRef, CustomInputProps>((props, ref) => {
  const {
    type,
    clearable,
    readOnly,
    autoFocus,
    className,
    disabled,
    maxLength,
    label,
    defaultValue = '',
    onChange,
    onBlur,
    onFocus,
    placeholder,
    ...restProps
  } = props;

  const contentRef = React.useRef<HTMLDivElement>(null);
  const pickerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = useControllableValue({ ...props, defaultValue });
  const [focused, setFocused] = React.useState<boolean>(autoFocus!);

  const showClearIcon = clearable && typeof value !== 'undefined' && value?.length > 0;

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('custom-input', { prefixCls });

  const cls = bem([
    {
      [`${type}`]: true,
      disabled,
      focus: focused,
      clearable: showClearIcon,
      readonly: readOnly,
    },
    className,
  ]);

  const onInputFocus = () => {
    if (disabled) return;

    window.setTimeout(() => {
      setFocused(true);
    }, 0);

    onFocus?.(value);
  };

  const onInputBlur = () => {
    setFocused(false);
    onBlur?.(value);
  };

  const onKeyClick = (key) => {
    if (['close', 'ok'].indexOf(key) > -1) {
      onInputBlur();
      return;
    }

    if (key !== 'delete' && value?.length >= maxLength!) {
      return;
    }

    const newValue = key === 'delete' ? value?.slice(0, value?.length - 1) : value + key;

    if (typeof value === 'undefined') {
      setValue(newValue);
    }

    setValue?.(newValue);
  };

  const onInputClear = (e) => {
    e.stopPropagation();
    setValue('');

    setValue?.('');
  };

  const scrollToStart = () => {
    contentRef.current!.scrollLeft = 0;
  };

  const scrollToEnd = () => {
    contentRef.current!.scrollLeft = contentRef.current!.scrollWidth;
  };

  const focus = () => {
    onInputFocus();
  };

  const blur = () => {
    onInputBlur();
  };

  // 渲染标签栏
  const labelRender = !!label && <div className={bem('label')}>{label}</div>;

  const clearIconRender = showClearIcon && (
    <CloseCircleFill className={bem('clear')} onClick={onInputClear} />
  );

  const textRender = <div className={bem('content')}>{value}</div>;

  const inputRender = (
    <div {...restProps} className={cls} onClick={onInputFocus}>
      {labelRender}
      <div className={bem('content')}>
        {(value === undefined || value === '') && !readOnly && (
          <div className={bem('placeholder')}>{placeholder}</div>
        )}
        <div ref={contentRef} className={bem('virtual-input')}>
          {value}
        </div>
        <input ref={inputRef} type="hidden" value={value} />
      </div>
      {clearIconRender}
      <KeyboardPicker ref={pickerRef} visible={focused} type={type} onKeyClick={onKeyClick} />
    </div>
  );

  useClickAway([contentRef, pickerRef], onInputBlur);

  React.useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  React.useEffect(() => {
    if (!focused) return;
    const timeout = window.setTimeout(() => {
      contentRef.current?.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }, 0);
    return () => {
      window.clearTimeout(timeout);
    };
  }, [focused]);

  React.useEffect(() => {
    if (readOnly) return;

    if (focused) {
      scrollToEnd();
    } else {
      scrollToStart();
    }
  }, [readOnly, focused, value]);

  return readOnly ? textRender : inputRender;
});

CustomInput.displayName = 'CustomInput';

CustomInput.defaultProps = {
  type: 'number',
};

export default CustomInput;
