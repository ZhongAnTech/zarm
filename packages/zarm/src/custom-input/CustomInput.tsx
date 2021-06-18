import * as React from 'react';
import classnames from 'classnames';
import { CloseCircleFill } from '@zarm-design/icons';
import type { BaseCustomInputProps } from './PropsType';
import KeyboardPicker from '../keyboard-picker';
import useClickAway from '../hooks/useClickAway';
import { getValue } from '../input/utils';

export type CustomInputProps = {
  prefixCls?: string;
} & BaseCustomInputProps;

const CustomInput = React.forwardRef<unknown, CustomInputProps>(
  (
    {
      prefixCls = 'za-custom-input',
      className,
      type = 'number',
      disabled,
      value,
      defaultValue,
      clearable = true,
      readOnly = false,
      autoFocus = false,
      maxLength,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      ...restProps
    }: CustomInputProps,
    ref,
  ) => {
    const wrapperRef = (ref as any) || React.createRef<HTMLElement>();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const pickerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [currentValue, setCurrentValue] = React.useState(getValue({ value, defaultValue }, ''));
    const [focused, setFocused] = React.useState<boolean>(autoFocus);
    const [area, setArea] = React.useState<React.RefObject<any>[]>([]);

    const showClearIcon =
      clearable &&
      typeof value !== 'undefined' &&
      currentValue.length > 0 &&
      typeof onChange === 'function';

    const cls = classnames(prefixCls, `${prefixCls}--${type}`, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--focus`]: focused,
      [`${prefixCls}--clearable`]: showClearIcon,
      [`${prefixCls}--readonly`]: readOnly,
    });

    const onInputFocus = () => {
      if (disabled) return;

      setArea([contentRef, pickerRef]);
      setFocused(true);

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

    const renderClearIcon = showClearIcon && (
      <CloseCircleFill className={`${prefixCls}__clear`} onClick={onInputClear} />
    );

    const renderText = <div className={`${prefixCls}__content`}>{currentValue}</div>;

    const renderInput = (
      <div {...restProps} ref={wrapperRef} className={cls} onClick={onInputFocus}>
        <div className={`${prefixCls}__content`}>
          {(currentValue === undefined || currentValue === '') && !readOnly && (
            <div className={`${prefixCls}__placeholder`}>{placeholder}</div>
          )}
          <div ref={contentRef} className={`${prefixCls}__virtual-input`}>
            {currentValue}
          </div>
          <input ref={inputRef} type="hidden" value={currentValue} />
        </div>
        {renderClearIcon}
        <KeyboardPicker ref={pickerRef} visible={focused} type={type} onKeyClick={onKeyClick} />
      </div>
    );

    useClickAway(onInputBlur, area);

    React.useImperativeHandle(wrapperRef, () => ({
      focus,
      blur,
    }));

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

    return readOnly ? renderText : renderInput;
  },
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
