import { createBEM } from '@zarm-design/bem';
import { Search as SearchIcon } from '@zarm-design/icons';
import isFunction from 'lodash/isFunction';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Input, { InputTextProps } from '../input';
import { getValue } from '../input/utils';
import type { HTMLProps } from '../utils/utilityTypes';
import type BaseSearchBarProps from './interface';

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
    style,
    shape,
    icon,
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
  const [currentValue, setCurrentValue] = React.useState(getValue({ value, defaultValue }, ''));
  const [isFocus, setIsFocus] = React.useState<boolean>(false);

  const { prefixCls, locale: globalLocal } = React.useContext(ConfigContext);
  const bem = createBEM('search-bar', { prefixCls });
  const locale = globalLocal?.SearchBar;

  const isShowCancel = React.useMemo(() => {
    if (isFunction(showCancel)) {
      return showCancel(isFocus, currentValue);
    }
    return showCancel && isFocus;
  }, [showCancel, isFocus]);

  const cls = bem([
    {
      [`${shape}`]: !!shape,
      focus: isFocus,
    },
    className,
  ]);

  const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    onFocus?.(e);
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    onBlur?.(e);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onChange?.(e);
  };

  const onFormSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    inputRef.current && inputRef.current.blur();
    onSubmit?.(currentValue);
  };

  const onClickCancelButton = (): void => {
    setCurrentValue('');
    inputRef.current && inputRef.current.blur();
    onCancel?.();
  };

  React.useImperativeHandle(ref, () => ({
    focus: inputRef.current?.focus,
    blur: inputRef.current?.blur,
    submit: onFormSubmit,
  }));

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue }, ''));
  }, [defaultValue, value]);

  const renderCancel = () => {
    return (
      isShowCancel && (
        <div className={bem('cancel')} ref={cancelRef} onClick={onClickCancelButton}>
          {cancelText || locale?.cancelText}
        </div>
      )
    );
  };

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
    <div className={cls} style={style}>
      <form action="#" className={bem('form')} onSubmit={onFormSubmit} ref={formRef}>
        <div className={bem('content')}>
          {icon !== null && <div className={bem('icon')}>{icon || <SearchIcon size="sm" />}</div>}
          <Input ref={inputRef} {...(inputProps as InputTextProps)} />
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
