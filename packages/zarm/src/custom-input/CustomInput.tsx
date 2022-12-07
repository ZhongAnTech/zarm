import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { CloseCircleFill } from '@zarm-design/icons';
import KeyboardPicker from '../keyboard-picker';
import useClickAway from '../useClickAway';
import { getValue } from '../input/utils';
import { ConfigContext } from '../config-provider';
import type { BaseCustomInputProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

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

const CustomInput = React.forwardRef<unknown, CustomInputProps>((props, ref) => {
  const {
    type,
    clearable,
    readOnly,
    autoFocus,
    className,
    disabled,
    value,
    defaultValue,
    maxLength,
    label,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    ...restProps
  } = props;

  const wrapperRef = (ref as any) || React.createRef<HTMLDivElement>();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const pickerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [currentValue, setCurrentValue] = React.useState(getValue({ value, defaultValue }, ''));
  const [focused, setFocused] = React.useState<boolean>(autoFocus!);

  const showClearIcon =
    clearable &&
    typeof value !== 'undefined' &&
    currentValue.length > 0 &&
    typeof onChange === 'function';

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

    if (typeof onFocus === 'function') {
      onFocus(currentValue);
    }
  };

  const onInputBlur = () => {
    setFocused(false);

    if (typeof onBlur === 'function') {
      onBlur(currentValue);
    }
  };

  const onKeyClick = (key) => {
    if (['close', 'ok'].indexOf(key) > -1) {
      onInputBlur();
      return;
    }

    if (key !== 'delete' && currentValue.length >= maxLength!) {
      return;
    }

    const newValue =
      key === 'delete' ? currentValue.slice(0, currentValue.length - 1) : currentValue + key;

    if (typeof value === 'undefined') {
      setCurrentValue(newValue);
    }

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const onInputClear = (e) => {
    e.stopPropagation();
    setCurrentValue('');

    if (typeof onChange === 'function') {
      onChange('');
    }
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

  const textRender = <div className={bem('content')}>{currentValue}</div>;

  const inputRender = (
    <div {...restProps} ref={wrapperRef} className={cls} onClick={onInputFocus}>
      {labelRender}
      <div className={bem('content')}>
        {(currentValue === undefined || currentValue === '') && !readOnly && (
          <div className={bem('placeholder')}>{placeholder}</div>
        )}
        <div ref={contentRef} className={bem('virtual-input')}>
          {currentValue}
        </div>
        <input ref={inputRef} type="hidden" value={currentValue} />
      </div>
      {clearIconRender}
      <KeyboardPicker ref={pickerRef} visible={focused} type={type} onKeyClick={onKeyClick} />
    </div>
  );

  useClickAway([contentRef, pickerRef], onInputBlur);

  React.useImperativeHandle(wrapperRef, () => ({
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
    setCurrentValue(getValue({ value, defaultValue }, ''));
  }, [value, defaultValue]);

  React.useEffect(() => {
    if (readOnly) return;

    if (focused) {
      scrollToEnd();
    } else {
      scrollToStart();
    }
  }, [readOnly, focused, currentValue]);

  return readOnly ? textRender : inputRender;
});

CustomInput.displayName = 'CustomInput';

CustomInput.defaultProps = {
  type: 'number',
  disabled: false,
  autoFocus: false,
  readOnly: false,
  clearable: false,
};

export default CustomInput;
