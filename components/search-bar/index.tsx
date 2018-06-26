import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseSearchBarProps } from './PropsType';
import Icon from '../icon';
import InputBase from '../input/InputBase';

let shouldUpdatePosition = false;

export interface SearchBarProps extends BaseSearchBarProps {
  prefixCls?: string;
  className?: string;
}

export default class SearchBar extends PureComponent<SearchBarProps, any> {
  static defaultProps = {
    prefixCls: 'za-searchbar',
    placeholder: '搜索',
    cancelText: '取消',
    disabled: false,
    showCancel: false,
    clearable: true,
  };

  private searchForm;
  private searchContainer;
  private cancelRef;
  private cancelOuterWidth;
  private initPos;
  private inputRef;

  constructor(props) {
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

  componentWillReceiveProps(nextProps) {
    const { cancelText, placeholder } = this.props;
    const { value } = this.state;
    if ('value' in nextProps && value !== nextProps.value ) {
      this.setState({
        value: nextProps.value,
      });
    }
    // 若改变了取消文字的内容或者placeholder的内容需要重新计算位置
    if (cancelText !== nextProps.cancelText || placeholder !== nextProps.placeholder) {
      shouldUpdatePosition = true;
    }
  }

  componentDidUpdate(prevProps) {
    if (shouldUpdatePosition) {
      this.calculatePositon(prevProps);
    }
    shouldUpdatePosition = false;
  }

  // 初始化搜索提示文字的位置
  calculatePositon(props) {
    const { showCancel } = props;
    const formWidth = this.searchForm.getBoundingClientRect().width;
    const containerWidth = this.searchContainer.getBoundingClientRect().width;
    const ml = parseInt(window.getComputedStyle(this.cancelRef, '')['margin-left'].split('px')[0], 10);
    this.cancelOuterWidth = Math.ceil(ml + parseInt(this.cancelRef.getBoundingClientRect().width, 10));
    if (!showCancel) {
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
      this.initPos = (formWidth / 2) - (containerWidth / 2);
    } else {
      this.initPos = (formWidth / 2) - (this.cancelOuterWidth / 2) - (containerWidth / 2);
    }

    if (!this.state.value) {
      this.searchContainer.style.transform = `translate3d(${this.initPos}px, 0, 0)`;
      this.searchContainer.style.webkitTransform = `translate3d(${this.initPos}px, 0, 0)`;
    } else {
      this.focusAnim(0);
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

  onChange(value) {
    const { onChange } = this.props;
    this.setState({ value });
    if (!this.state.isOnComposition && onChange) {
      onChange(value);
    }
  }

  handleComposition(e) {
    if (e.type === 'compositionstart') {
      this.setState({
        isOnComposition: true,
      });
    }

    if (e.type === 'compositionend') {
      // composition is end
      this.setState({
        isOnComposition: false,
      });
      const value = e.target.value;
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }

  onBlur() {
    const { value } = this.state;
    this.setState({
      focus: false,
    });
    if (!value) {
      this.blurAnim();
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  onClear(val) {
    this.setState({
      value: '',
      isOnComposition: false,
    }, () => {
      // this.setState({ focus: true });
      this.focus();
    });

    if (this.props.onClear) {
      this.props.onClear(val);
    }
  }

  onCancel() {
    const { showCancel } = this.props;
    if (!showCancel) {
      this.setState({
        value: '',
        isOnComposition: false,
      }, () => {
        this.onBlur();
      });
    }

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
    this.cancelRef.style.cssText = `margin-right: 0px;`;
    this.cancelRef.classList.add('animation-ease');
  }

  blurAnim() {
    const { showCancel } = this.props;
    this.searchContainer.style.cssText += `transform: translate3d(${this.initPos}px, 0, 0);transition: 300ms;`;
    if (!showCancel) {
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
      [`${prefixCls}-cancel-show`]: !!(showCancel || focus || (value && value.length > 0)),
    });

    return (
      <div
        className={cancelCls}
        ref={(cancelRef) => { this.cancelRef = cancelRef; }}
        onClick={() => { this.onCancel(); }}
      >
        {cancelText}
      </div>
    );
  }

  render() {
    const { prefixCls, className, shape, placeholder, disabled, clearable } = this.props;
    const { value, focus, isOnComposition } = this.state;
    const formCls = classnames(`${prefixCls}-form`, className, {
      [`${prefixCls}-form-focus`]: !!(focus || (value && value.length > 0)),
    });

    const contentCls = classnames(`${prefixCls}-content`, {
      [`shape-${shape}`]: !!shape,
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
            <div className={`${prefixCls}-mock`}>
              <div
                className={`${prefixCls}-mock-container`}
                ref={(searchContainer) => { this.searchContainer = searchContainer; }}
              >
                <Icon type="search" />
                <span
                  className={`${prefixCls}-mock-placeholder`}
                  style={{ visibility: value || isOnComposition ? 'hidden' : 'visible' }}
                >
                  {placeholder}
                </span>
              </div>
            </div>
            <InputBase
              type="search"
              placeholder={placeholder}
              value={value}
              onFocus={() => { this.onFocus(); }}
              onCompositionStart={(e) => { this.handleComposition(e); }}
              onCompositionUpdate={(e) => { this.handleComposition(e); }}
              onCompositionEnd={(e) => { this.handleComposition(e); }}
              onChange={(val) => { this.onChange(val); }}
              onBlur={() => { this.onBlur(); }}
              onClear={(val) => { this.onClear(val); }}
              disabled={disabled}
              clearable={clearable}
              ref={(inputRef) => { this.inputRef = inputRef; }}
            />
          </div>
          {this.renderCancel()}
        </form>
      </div>
    );
  }
}
