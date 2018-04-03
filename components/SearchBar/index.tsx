import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseSearchbarProps } from './PropsType';

export interface SearchbarProps extends BaseSearchbarProps {
  prefixCls?: string;
  className?: string;
}

export default class SearchBar extends PureComponent<SearchbarProps, any> {

  static defaultProps = {
    prefixCls: 'za-searchbar',
    disabled: false,
  };

  private searchForm;
  private searchContainer;
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
    const formWidth = this.searchForm.offsetWidth;
    const containerWidth = this.searchContainer.offsetWidth;

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

  onInput(e) {
    if (!this.state.focus) {
      this.setState({
        focus: true,
      });
    }
    const value = e.target.value;
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
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
  }

  blurAnim() {
    this.searchContainer.style.cssText += `transform: translate3d(${this.initPos}px, 0, 0);transition: 300ms;`;
  }

  focus() {
    this.inputRef.focus();
  }

  render() {
    const { prefixCls, className, shape, placeholder, cancelText, disabled } = this.props;
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

    const cancelCls = classnames(`${prefixCls}-cancel`, {
      [`${prefixCls}-cancel-show`]: !!(focus || (value && value.length > 0)),
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
              <span
                className={`${prefixCls}-mock-container`}
                ref={(searchContainer) => { this.searchContainer = searchContainer; }}
              >
                <i />
                <span
                  className={`${prefixCls}-mock-placeholder`}
                  style={{ visibility: value ? 'hidden' : 'visible' }}
                >
                  {placeholder}
                </span>
              </span>
            </div>
            <input
              type="search"
              autoComplete="off"
              name="search"
              placeholder={placeholder}
              className={`${prefixCls}-input`}
              value={value}
              onFocus={() => { this.onFocus(); }}
              onInput={(e) => { this.onInput(e); }}
              onBlur={() => { this.onBlur(); }}
              disabled={disabled}
              ref={(inputRef) => { this.inputRef = inputRef; }}
            />
            <div className={clearCls} onClick={() => { this.onClear(); }} />
          </div>
          <div className={cancelCls} onClick={() => { this.onCancel(); }}>{cancelText}</div>
        </form>
      </div>
    );
  }
}
