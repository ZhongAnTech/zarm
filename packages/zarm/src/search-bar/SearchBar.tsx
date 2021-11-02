import * as React from 'react';
import classnames from 'classnames';
import { Search as SearchIcon } from '@zarm-design/icons';
import type BaseSearchBarProps from './interface';
import { ConfigContext } from '../n-config-provider';
import { useEventCallback } from '../utils/hooks';
import Input, { InputTextProps } from '../input';
import { getValue } from '../input/utils';

export type SearchBarProps = BaseSearchBarProps & React.InputHTMLAttributes<HTMLInputElement>;

const SearchBar = React.forwardRef<unknown, SearchBarProps>((props, ref) => {
  const {
    className,
    shape,
    placeholder,
    showCancel,
    cancelText,
    defaultValue,
    value,
    onFocus,
    onBlur,
    onChange,
    onCancel,
    onSubmit,
    ...restProps
  } = props;
  const cancelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>();
  const formRef = React.createRef<HTMLFormElement>();
  const cancelOuterWidth = React.useRef<number>(0);
  const [currentValue, setCurrentValue] = React.useState(getValue({ value, defaultValue }, ''));
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const { prefixCls: globalPrefixCls, locale: globalLocal } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-search-bar`;
  const locale = globalLocal?.SearchBar;

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--${shape}`]: !!shape,
    [`${prefixCls}--focus`]: !!(showCancel || isFocus || String(currentValue).length > 0),
  });

  const blurAnim = (): void => {
    if (!showCancel && cancelRef.current) {
      cancelRef.current.style.cssText = `margin-right: -${cancelOuterWidth.current}px;`;
    }
  };

  const focusAnim = (): void => {
    if (!cancelRef.current) return;
    cancelRef.current.style.cssText = 'margin-right: 0px;';
  };

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocus(true);
    focusAnim();
    typeof onFocus === 'function' && onFocus(e);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocus(false);
    !currentValue && blurAnim();
    typeof onBlur === 'function' && onBlur(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(e.target.value);
    typeof onChange === 'function' && onChange(e);
  };

  const onFormSubmit = (e?: React.FormEvent): void => {
    e?.preventDefault();
    inputRef.current && inputRef.current.blur();
    typeof onSubmit === 'function' && onSubmit(currentValue);
  };

  const onClickCancelButton = (): void => {
    setCurrentValue('');
    inputRef.current && inputRef.current.blur();
    blurAnim();
    typeof onCancel === 'function' && onCancel();
  };

  const calculatePositon = useEventCallback(() => {
    if (!cancelRef.current) return;
    if (!showCancel) {
      const ml = parseInt(
        window.getComputedStyle(cancelRef.current, '')['margin-left'].split('px')[0],
        10,
      );
      const w = Math.ceil(ml + cancelRef.current.getBoundingClientRect().width);
      cancelOuterWidth.current = w;
      cancelRef.current!.style.cssText = `margin-right: -${w}px;`;
    } else {
      cancelRef.current.style.cssText = 'margin-right: 0px;';
    }

    if (currentValue) {
      focusAnim();
    }
  }, [currentValue, showCancel]);

  React.useImperativeHandle(ref, () => ({
    focus: inputRef.current?.focus,
    blur: inputRef.current?.blur,
    submit: onFormSubmit,
  }));

  React.useEffect(() => {
    calculatePositon();
  }, [cancelText, showCancel, locale, calculatePositon]);

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue }, ''));
  }, [defaultValue, value]);

  const cancelRender = (
    <div className={`${prefixCls}__cancel`} ref={cancelRef} onClick={onClickCancelButton}>
      {cancelText || locale?.cancelText}
    </div>
  );

  const inputProps: InputTextProps = {
    type: 'search',
    placeholder: placeholder || (locale && locale.placeholder),
    defaultValue,
    onFocus: onInputFocus,
    onBlur: onInputBlur,
    ...restProps,
  };

  if ('value' in props) {
    inputProps.value = currentValue;
  }
  if ('onChange' in props) {
    inputProps.onChange = onInputChange;
  }

  return (
    <div className={cls}>
      <form action="#" className={`${prefixCls}__form`} onSubmit={onFormSubmit} ref={formRef}>
        <div className={`${prefixCls}__content`}>
          <SearchIcon size="sm" className={`${prefixCls}__icon`} />
          <Input ref={inputRef} {...(inputProps as InputTextProps)} />
        </div>
        {cancelRender}
      </form>
    </div>
  );
});

SearchBar.defaultProps = {
  shape: 'radius',
  disabled: false,
  showCancel: false,
  clearable: true,
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
