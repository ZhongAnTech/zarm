import React, { PureComponent } from 'react';
import classnames from 'classnames';
import BaseSearchBarProps from './PropsType';
import Icon from '../icon';
import InputBase from '../input/InputBase';

export interface SearchBarProps extends BaseSearchBarProps {
  prefixCls?: string;
  className?: string;
}

export default class SearchBar extends PureComponent<SearchBarProps, any> {
  private cancelRef;

  private cancelOuterWidth;

  private inputRef;

  static defaultProps = {
    prefixCls: 'za-search-bar',
    shape: 'radius',
    disabled: false,
    showCancel: false,
    clearable: true,
  };

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

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== state.preValue) {
      return {
        value: nextProps.value,
        preValue: nextProps.value,
      };
    }
    return null;
  }


  componentDidUpdate(prevProps) {
    const { cancelText, showCancel, locale } = this.props;
    // 若改变了取消文字的内容或者placeholder的内容需要重新计算位置
    if (cancelText !== prevProps.cancelText
      || showCancel !== prevProps.showCancel
      || locale.cancelText !== prevProps.locale.cancelText
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

  onChange(value) {
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

    this.setState({
      focus: false,
    }, () => {
      !value && this.blurAnim();
      focus && onBlur && onBlur();
    });
  }

  onClear() {
    const { onClear, onChange } = this.props;
    this.setState({
      value: '',
      isOnComposition: false,
    }, () => {
      this.focus();
    });
    onClear && onClear('');
    onChange && onChange('');
  }

  onCancel() {
    const { onCancel } = this.props;
    this.setState({
      value: '',
      isOnComposition: false,
    }, () => {
      this.onBlur();
    });
    onCancel && onCancel();
  }

  onSubmit(e) {
    const { onSubmit } = this.props;
    const { value } = this.state;

    e.preventDefault();
    this.inputRef.blur();
    onSubmit && onSubmit(value);
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

      const { onChange } = this.props;
      const { value } = e.target;
      onChange && onChange(value);
    }
  }

  // 初始化搜索提示文字的位置
  calculatePositon(props) {
    const { showCancel } = props;
    const { value } = this.state;

    const ml = parseInt(window.getComputedStyle(this.cancelRef, '')['margin-left'].split('px')[0], 10);
    this.cancelOuterWidth = Math.ceil(ml + this.cancelRef.getBoundingClientRect().width);

    if (!showCancel) {
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
    } else {
      this.cancelRef.style.cssText = 'margin-right: 0px;';
    }

    if (value) {
      this.focusAnim();
    }
  }

  focusAnim() {
    this.cancelRef.style.cssText = 'margin-right: 0px;';
    this.cancelRef.className += ' animation-ease';
  }

  blurAnim() {
    const { showCancel } = this.props;
    if (!showCancel) {
      this.cancelRef.style.cssText = `margin-right: -${this.cancelOuterWidth}px;`;
    }
  }

  focus() {
    this.inputRef.focus();
  }

  renderCancel() {
    const { prefixCls, cancelText, locale } = this.props;

    return (
      <div
        className={`${prefixCls}__cancel`}
        ref={(cancelRef) => { this.cancelRef = cancelRef; }}
        onClick={() => { this.onCancel(); }}
      >
        {cancelText || locale.cancelText}
      </div>
    );
  }

  render() {
    const { prefixCls, className, shape, placeholder, disabled, clearable, showCancel, maxLength, locale } = this.props;
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
          onSubmit={(e) => { this.onSubmit(e); }}
        >
          <div className={`${prefixCls}__content`}>
            <Icon type="search" className={`${prefixCls}__icon`} />
            <div className={`${prefixCls}__mock`}>
              <InputBase
                className={`${prefixCls}__input`}
                type="search"
                placeholder={placeholder || locale.placeholder}
                value={value}
                maxLength={maxLength}
                onFocus={() => { this.onFocus(); }}
                onCompositionStart={(e) => { this.handleComposition(e); }}
                onCompositionUpdate={(e) => { this.handleComposition(e); }}
                onCompositionEnd={(e) => { this.handleComposition(e); }}
                onChange={(val) => { this.onChange(val); }}
                onBlur={() => { this.onBlur(); }}
                onClear={() => { this.onClear(); }}
                disabled={disabled}
                clearable={clearable}
                ref={(inputRef) => { this.inputRef = inputRef; }}
              />
            </div>
          </div>
          {this.renderCancel()}
        </form>
      </div>
    );
  }
}
