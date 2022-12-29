import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import { Search as SearchIcon } from '@zarm-design/icons';
import type BaseSearchBarProps from './interface';
import { ConfigContext } from '../config-provider';
import { useEventCallback } from '../utils/hooks';
import Input, { InputTextProps } from '../input';
import { getValue } from '../input/utils';
import type { HTMLProps } from '../utils/utilityTypes';

export interface SearchBarCssVars {
  '--background'?: React.CSSProperties['background'];
  '--height'?: React.CSSProperties['height'];
  '--padding-horizontal'?: React.CSSProperties['paddingRight'];
  '--input-padding-horizontal'?: React.CSSProperties['paddingRight'];
  '--input-height'?: React.CSSProperties['height'];
  '--input-background'?: React.CSSProperties['background'];
  '--input-font-size'?: React.CSSProperties['fontSize'];
  '--input-placeholder-color'?: React.CSSProperties['color'];
  '--input-clear-icon-color'?: React.CSSProperties['color'];
  '--input-border-radius'?: React.CSSProperties['borderRadius'];
  '--cancel-font-size'?: React.CSSProperties['fontSize'];
  '--cancel-color'?: React.CSSProperties['color'];
  '--cancel-margin-left'?: React.CSSProperties['marginLeft'];
  '--cancel-transition'?: React.CSSProperties['transition'];
  '--icon-margin-right'?: React.CSSProperties['marginRight'];
  '--icon-color'?: React.CSSProperties['color'];
}

export type SearchBarProps = BaseSearchBarProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  HTMLProps<SearchBarCssVars>;

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

  const { prefixCls, locale: globalLocal } = React.useContext(ConfigContext);
  const bem = createBEM('search-bar', { prefixCls });
  const locale = globalLocal?.SearchBar;

  const cls = bem([
    {
      [`${shape}`]: !!shape,
      focus: !!(showCancel || isFocus || String(currentValue).length > 0),
    },
    className,
  ]);

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
    onFocus?.(e);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    setIsFocus(false);
    !currentValue && blurAnim();
    onBlur?.(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCurrentValue(e.target.value);
    onChange?.(e);
  };

  const onFormSubmit = (e?: React.FormEvent): void => {
    e?.preventDefault();
    inputRef.current && inputRef.current.blur();
    onSubmit?.(currentValue);
  };

  const onClickCancelButton = (): void => {
    setCurrentValue('');
    inputRef.current && inputRef.current.blur();
    blurAnim();
    onCancel?.();
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
    <div className={bem('cancel')} ref={cancelRef} onClick={onClickCancelButton}>
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
      <form action="#" className={bem('form')} onSubmit={onFormSubmit} ref={formRef}>
        <div className={bem('content')}>
          <SearchIcon size="sm" className={bem('icon')} />
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
