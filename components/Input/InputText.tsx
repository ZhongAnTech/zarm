import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseInputTextProps } from './PropsType';
import Icon from '../Icon';

let isOnComposition = false;
export interface InputTextProps extends BaseInputTextProps {
  prefixCls?: string;
  className?: string;
}

export default class InputText extends PureComponent<InputTextProps, any> {

  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
  };

  private input;
  private onBlurTimeout;
  private blurFromClear;

  constructor(props) {
    super(props);
    this.state = {
      focused: props.focused || false,
      value: props.defaultValue || props.value || '',
    };
  }

  componentDidMount() {
    if (this.props.autoFocus || this.state.focused) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('focused' in nextProps) {
      this.setState({
        focused: nextProps.focused,
      });
    }

    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.focused) {
      this.input.focus();
    }
  }

  componentWillUnmount() {
    if (this.onBlurTimeout) {
      clearTimeout(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }
  }

  onFocus = (e) => {
    if (!('focused' in this.props)) {
      this.setState({
        focused: true,
      });
    }

    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e.target.value);
    }
  }

  onBlur = (e) => {
    this.onBlurTimeout = setTimeout(() => {
      if (!this.blurFromClear && document.activeElement !== this.input) {
        this.setState({
          focused: false,
        });
      }
      this.blurFromClear = false;
      const { onBlur } = this.props;
      if (typeof onBlur === 'function') {
        onBlur(e.target.value);
      }
    }, 0);
  }

  onChange = (e) => {
    const { onChange } = this.props;
    if (!this.state.focused) {
      this.setState({
        focused: true,
      });
    }
    this.setState({
      value: e.target.value,
    });
    if (e.target instanceof HTMLInputElement && !isOnComposition) {
      if (onChange) {
        onChange(e.target.value);
      }
    }
  }

  onClear() {
    this.blurFromClear = true;
    const { value } = this.state;
    this.setState({
      value: '',
    });
    // this.onFocus();
    if (this.props.onClear) {
      this.props.onClear(value);
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

  render() {
    const { prefixCls, className, disabled, onClear, clearable, ...others } = this.props;
    const { value, focused } = this.state;
    const cls = classnames(prefixCls, `${prefixCls}-text`, className, {
      disabled,
    });
    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: !!(focused && value && value.length > 0),
    });
    return (
      <div className={cls}>
        <input
          {...others}
          ref={(ele) => { this.input = ele; }}
          type="text"
          disabled={disabled}
          value={value}
          onCompositionStart={(e) => { this.handleComposition(e); }}
          onCompositionUpdate={(e) => { this.handleComposition(e); }}
          onCompositionEnd={(e) => { this.handleComposition(e); }}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        {clearable && <Icon type="wrong-round-fill" className={clearCls} onClick={() => { this.onClear(); }} />}
      </div>
    );
  }
}
