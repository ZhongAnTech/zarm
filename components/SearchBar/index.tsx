import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseSearchbarProps } from './PropsType';
import Icon from '../Icon';

let isOnComposition = false;

export interface SearchbarProps extends BaseSearchbarProps {
  prefixCls?: string;
  className?: string;
}

export default class SearchBar extends PureComponent<SearchbarProps, any> {

  static defaultProps = {
    prefixCls: 'za-searchbar',
    disabled: false,
    showCancel: true,
  };

  private searchForm;
  private searchContainer;
  private cancelRef;
  private cancelOuterWidth;
  private initPos;
  private onBlurTimeout;
  private blurFromClear;
  private inputRef;

  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      value: props.defaultValue || props.value || '',
    };
  }

  componentDidMount() {
    const formWidth = this.searchForm.getBoundingClientRect().width;
    const containerWidth = this.searchContainer.getBoundingClientRect().width;
    if (this.cancelRef) {
      const ml = parseInt(window.getComputedStyle(this.cancelRef, '')['margin-left'].split('px')[0], 10);
      this.cancelOuterWidth = Math.ceil(ml + parseInt(this.cancelRef.getBoundingClientRect().width, 10));
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
    }

    this.initPos = (formWidth / 2) - (containerWidth / 2);
    if (!this.state.value) {
      this.searchContainer.style.transform = `translate3d(${this.initPos}px, 0, 0)`;
      this.searchContainer.style.webkitTransform = `translate3d(${this.initPos}px, 0, 0)`;
    } else {
      this.focusAnim(0);
    }

  }

  componentWillUnmount() {
    if (this.onBlurTimeout) {
      clearTimeout(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }
  }

  onFocus() {
    this.setState({
      focus: true,
    });
    this.focusAnim();
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onChange(e) {
    const { maxLength } = this.props;
    if (!this.state.focus) {
      this.setState({
        focus: true,
      });
    }
    const value = maxLength ? e.target.value.slice(0, maxLength) : e.target.value;
    this.setState({ value });
    // only when onComposition===false to fire onChange
    if (e.target instanceof HTMLInputElement && !isOnComposition) {
      if (this.props.onChange) {
        this.props.onChange(value);
        // props.onChange(e)
      }
    }
  }

  handleComposition(e) {
    if (e.type === 'compositionend') {
      // composition is end
      isOnComposition = false;
      const value = e.target.value;
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    } else {
      // in composition
      isOnComposition = true;
    }
  }

  onBlur() {
    // 延迟onBlur的触发时间
    this.onBlurTimeout = setTimeout(() => {
      const { value } = this.state;
      if (!this.blurFromClear && document.activeElement !== this.inputRef) {
        this.setState({
          focus: false,
        });
        if (!value) {
          this.blurAnim();
        }
      }
      this.blurFromClear = false;
      if (this.props.onBlur) {
        this.props.onBlur();
      }
    }, 0);
  }

  onClear() {
    this.blurFromClear = true;
    this.setState({
      value: '',
    });
    this.focus();
    if (this.props.onClear) {
      this.props.onClear();
    }
  }

  onCancel() {
    this.blurFromClear = false;
    this.setState({
      value: '',
    });
    this.onBlur();

    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { value } = this.state;
    this.inputRef.blur();
    if (this.props.onSubmit) {
      this.props.onSubmit(value);
    }
  }

  focusAnim(transition = 300) {
    this.searchContainer.style.cssText += `transform: translate3d(10px, 0, 0);transition: ${transition}ms;`;
    if (this.cancelRef) {
      this.cancelRef.style.cssText = `margin-right: 0px;`;
    }
  }

  blurAnim() {
    this.searchContainer.style.cssText += `transform: translate3d(${this.initPos}px, 0, 0);transition: 300ms;`;
    if (this.cancelRef) {
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
    }
  }

  focus() {
    this.inputRef.focus();
  }

  renderCancel() {
    const { prefixCls, cancelText, showCancel } = this.props;
    const { value, focus } = this.state;
    const cancelCls = classnames(`${prefixCls}-cancel`, {
      [`${prefixCls}-cancel-show`]: !!(focus || (value && value.length > 0)),
    });

    return showCancel &&
      <div
        className={cancelCls}
        ref={(cancelRef) => { this.cancelRef = cancelRef; }}
        onClick={() => { this.onCancel(); }}
      >
        {cancelText}
      </div>;
  }

  render() {
    const { prefixCls, className, shape, placeholder, disabled } = this.props;
    const { value, focus } = this.state;
    const formCls = classnames(`${prefixCls}-form`, className, {
      [`${prefixCls}-form-focus`]: !!(focus || (value && value.length > 0)),
    });

    const contentCls = classnames(`${prefixCls}-content`, {
      [`shape-${shape}`]: !!shape,
    });

    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: !!(focus && value && value.length > 0),
    });

    return (
      <div className={`${prefixCls}`}>
        <form
          action="#"
          className={formCls}
          onSubmit={(e) => { this.onSubmit(e); }}
          ref={(searchForm) => { this.searchForm = searchForm; }}
        >
          <div className={contentCls}>
            <div
              className={`${prefixCls}-mock`}
            >
              <div
                className={`${prefixCls}-mock-container`}
                ref={(searchContainer) => { this.searchContainer = searchContainer; }}
              >
                <Icon type="search" />
                <span
                  className={`${prefixCls}-mock-placeholder`}
                  style={{ visibility: value ? 'hidden' : 'visible' }}
                >
                  {placeholder}
                </span>
              </div>
            </div>
            <input
              type="search"
              autoComplete="off"
              name="search"
              placeholder={placeholder}
              className={`${prefixCls}-input`}
              value={value}
              onFocus={() => { this.onFocus(); }}
              onCompositionStart={(e) => { this.handleComposition(e); }}
              onCompositionUpdate={(e) => { this.handleComposition(e); }}
              onCompositionEnd={(e) => { this.handleComposition(e); }}
              onChange={(e) => { this.onChange(e); }}
              onBlur={() => { this.onBlur(); }}
              disabled={disabled}
              ref={(inputRef) => { this.inputRef = inputRef; }}
            />
            <Icon type="wrong-round-fill" className={clearCls} onClick={() => { this.onClear(); }} />
          </div>
          {this.renderCancel()}
        </form>
      </div>
    );
  }
}
