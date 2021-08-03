import * as React from 'react';
import classnames from 'classnames';
import { Search as SearchIcon } from '@zarm-design/icons';
import type BaseSearchBarProps from './interface';
import useEventCallback from '../utils/hooks/useEventCallback';
import { ConfigContext } from '../n-config-provider';
import Input from '../input';
import { getValue } from '../input/utils';

export type SearchBarProps = BaseSearchBarProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
  };

const SearchBar = React.forwardRef<unknown, SearchBarProps>((props, ref) => {
  const {
    className,
    shape,
    placeholder,
    disabled,
    clearable,
    showCancel,
    maxLength,
    locale,
    cancelText,
    defaultValue,
    value,
  } = props;
  const cancelRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement | HTMLInputElement>();
  const formRef = React.createRef<HTMLFormElement>();
  const cancelOuterWidth = React.useRef<number>(0);
  const [currentValue, setCurrentValue] = React.useState<string>(getValue({ value, defaultValue }));
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [isOnComposition, setIsOnComposition] = React.useState<boolean>(false);

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-search-bar`;
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--${shape}`]: !!shape,
    [`${prefixCls}--focus`]: !!(showCancel || isFocus || (currentValue && currentValue.length > 0)),
  });

  const blurAnim = (): void => {
    if (!showCancel && cancelRef.current) {
      cancelRef.current.style.cssText = `margin-right: -${cancelOuterWidth.current}px;`;
    }
  };

  const focusAnim = (): void => {
    if (!cancelRef.current) return;
    cancelRef.current.style.cssText = 'margin-right: 0px;';
    cancelRef.current.className += ' animation-ease';
  };

  const onInternalBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { onBlur } = props;
    setIsFocus(false);
    !currentValue && blurAnim();
    typeof onBlur === 'function' && onBlur(e);
  };

  const handleCancelCallback = useEventCallback(onInternalBlur, [currentValue, isOnComposition]);

  const onInternalCancel = (): void => {
    const { onCancel } = props;
    setCurrentValue('');
    setIsOnComposition(false);
    handleCancelCallback();
    typeof onCancel === 'function' && onCancel();
  };

  const onInternalFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { onFocus } = props;
    setIsFocus(true);
    focusAnim();
    typeof onFocus === 'function' && onFocus(e);
  };

  const onInternalChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = props;
    setCurrentValue(e.target.value);
    if (!isOnComposition && typeof onChange === 'function') {
      onChange(e);
    }
  };

  const handleComposition = (
    e: React.CompositionEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (e.type === 'compositionstart') {
      setIsOnComposition(true);
    }

    if (e.type === 'compositionend') {
      setIsOnComposition(false);
      const { onChange } = props;
      typeof onChange === 'function' && onChange(e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const calculatePositon = React.useCallback(() => {
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

  const onInternalSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const { onSubmit } = props;
    inputRef.current && inputRef.current.blur();
    typeof onSubmit === 'function' && onSubmit(currentValue);
  };

  React.useImperativeHandle(ref, () => ({
    focus: inputRef.current?.focus,
    blur: inputRef.current?.blur,
    submit: formRef.current?.submit,
  }));

  React.useEffect(() => {
    calculatePositon();
  }, [cancelText, showCancel, locale, calculatePositon]);

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue: defaultValue || '' }));
  }, [defaultValue, value]);

  const renderCancel = (): JSX.Element => {
    return (
      <div className={`${prefixCls}__cancel`} ref={cancelRef} onClick={onInternalCancel}>
        {cancelText || locale?.cancelText}
      </div>
    );
  };

  return (
    <div className={cls}>
      <form action="#" className={`${prefixCls}__form`} onSubmit={onInternalSubmit} ref={formRef}>
        <div className={`${prefixCls}__content`}>
          <SearchIcon size="sm" className={`${prefixCls}__icon`} />
          <div className={`${prefixCls}__mock`}>
            <Input
              className={`${prefixCls}__input`}
              type="search"
              placeholder={placeholder || (locale && locale.placeholder)}
              value={currentValue}
              maxLength={maxLength}
              onFocus={onInternalFocus}
              onCompositionStart={handleComposition}
              onCompositionUpdate={handleComposition}
              onCompositionEnd={handleComposition}
              onChange={onInternalChange}
              onBlur={onInternalBlur}
              disabled={disabled}
              clearable={clearable}
              ref={inputRef}
            />
          </div>
        </div>
        {renderCancel()}
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
