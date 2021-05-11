import React, { PureComponent, CompositionEvent } from 'react';
import type { FormEvent } from 'react';
import classnames from 'classnames';
import { Search as SearchIcon } from '@zarm-design/icons';
import type BaseSearchBarProps from './PropsType';
import InputBase from '../input/InputBase';

export interface SearchBarProps extends BaseSearchBarProps {
  prefixCls?: string;
  className?: string;
}

export interface SearchBarState {
  focus: boolean;
  value?: string;
  isOnComposition: boolean;
  preValue?: string;
}

export default class SearchBar extends PureComponent<SearchBarProps, SearchBarState> {
  private cancelRef: HTMLDivElement | null = null;

  private cancelOuterWidth: number;

  private inputRef: InputBase | null = null;

  static defaultProps: SearchBarProps = {
    prefixCls: 'za-search-bar',
    shape: 'radius',
    disabled: false,
    showCancel: false,
    clearable: true,
  };

  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      focus: false,
      value: props.defaultValue || props.value || '',
      isOnComposition: false,
    };
  }

  componentDidMount() {
    this.calculatePositon(this.props);
  }

  static getDerivedStateFromProps(nextProps: SearchBarProps, state: SearchBarState) {
    if ('value' in nextProps && nextProps.value !== state.preValue) {
      return {
        value: nextProps.value,
        preValue: nextProps.value,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: SearchBarProps) {
    const { cancelText, showCancel, locale } = this.props;
    // 若改变了取消文字的内容或者placeholder的内容需要重新计算位置
    if (
      cancelText !== prevProps.cancelText ||
      showCancel !== prevProps.showCancel ||
      (locale && prevProps.locale && locale.cancelText !== prevProps.locale.cancelText)
    ) {
      this.calculatePositon(this.props);
    }
  }

  onFocus() {
    const { onFocus } = this.props;
    this.setState({ focus: true });
    this.focusAnim();
    onFocus && onFocus();
  }

  onChange(value?: string) {
    const { onChange } = this.props;
    const { isOnComposition } = this.state;

    this.setState({ value });
    if (!isOnComposition && onChange) {
      onChange(value);
    }
  }

  onBlur() {
    const { onBlur } = this.props;
    const { value, focus } = this.state;

    this.setState({ focus: false }, () => {
      !value && this.blurAnim();
      focus && onBlur && onBlur();
    });
  }

  onClear() {
    const { onClear, onChange } = this.props;
    this.setState({ value: '', isOnComposition: false }, () => {
      this.focus();
    });
    onClear && onClear('');
    onChange && onChange('');
  }

  onCancel() {
    const { onCancel } = this.props;
    this.setState({ value: '', isOnComposition: false }, () => {
      this.onBlur();
    });
    onCancel && onCancel();
  }

  onSubmit(e: FormEvent) {
    const { onSubmit } = this.props;
    const { value } = this.state;

    e.preventDefault();
    this.inputRef && this.inputRef.blur();
    onSubmit && onSubmit(value);
  }

  handleComposition(e: CompositionEvent<HTMLInputElement>) {
    if (e.type === 'compositionstart') {
      this.setState({ isOnComposition: true });
    }

    if (e.type === 'compositionend') {
      // composition is end
      this.setState({ isOnComposition: false });

      const { onChange } = this.props;
      const { target } = e;
      const { value } = target as HTMLInputElement;
      onChange && onChange(value);
    }
  }

  // 初始化搜索提示文字的位置
  calculatePositon(props: SearchBarProps) {
    if (!this.cancelRef) return;
    const { showCancel } = props;
    const { value } = this.state;

    if (!showCancel) {
      const ml = parseInt(
        window.getComputedStyle(this.cancelRef, '')['margin-left'].split('px')[0],
        10,
      );
      this.cancelOuterWidth = Math.ceil(ml + this.cancelRef.getBoundingClientRect().width);
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
    } else {
      this.cancelRef.style.cssText = 'margin-right: 0px;';
    }

    if (value) {
      this.focusAnim();
    }
  }

  focusAnim() {
    if (!this.cancelRef) return;
    this.cancelRef.style.cssText = 'margin-right: 0px;';
    this.cancelRef.className += ' animation-ease';
  }

  blurAnim() {
    const { showCancel } = this.props;
    if (!showCancel && this.cancelRef) {
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
    }
  }

  focus() {
    this.inputRef && this.inputRef.focus();
  }

  renderCancel() {
    const { prefixCls, cancelText, locale } = this.props;

    return (
      <div
        className={`${prefixCls}__cancel`}
        ref={(cancelRef) => {
          this.cancelRef = cancelRef;
        }}
        onClick={() => {
          this.onCancel();
        }}
      >
        {cancelText || (locale && locale.cancelText)}
      </div>
    );
  }

  render() {
    const {
      prefixCls,
      className,
      shape,
      placeholder,
      disabled,
      clearable,
      showCancel,
      maxLength,
      locale,
    } = this.props;
    const { value, focus } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--focus`]: !!(showCancel || focus || (value && value.length > 0)),
    });

    return (
      <div className={cls}>
        <form
          action="#"
          className={`${prefixCls}__form`}
          onSubmit={(e) => {
            this.onSubmit(e);
          }}
        >
          <div className={`${prefixCls}__content`}>
            <SearchIcon size="sm" className={`${prefixCls}__icon`} />
            <div className={`${prefixCls}__mock`}>
              <InputBase
                className={`${prefixCls}__input`}
                type="search"
                placeholder={placeholder || (locale && locale.placeholder)}
                value={value}
                maxLength={maxLength}
                onFocus={() => {
                  this.onFocus();
                }}
                onCompositionStart={(e) => {
                  this.handleComposition(e);
                }}
                onCompositionUpdate={(e) => {
                  this.handleComposition(e);
                }}
                onCompositionEnd={(e) => {
                  this.handleComposition(e);
                }}
                onChange={(val) => {
                  this.onChange(val);
                }}
                onBlur={() => {
                  this.onBlur();
                }}
                onClear={() => {
                  this.onClear();
                }}
                disabled={disabled}
                clearable={clearable}
                ref={(inputRef) => {
                  this.inputRef = inputRef;
                }}
              />
            </div>
          </div>
          {this.renderCancel()}
        </form>
      </div>
    );
  }
}
