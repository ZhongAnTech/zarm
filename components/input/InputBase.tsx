import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseInputBaseProps } from './PropsType';
import Icon from '../icon';

export interface InputBaseProps extends BaseInputBaseProps {
  prefixCls?: string;
  className?: string;
}

export default class InputBase extends PureComponent<InputBaseProps, any> {
  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
    type: 'text',
    clearable: true,
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
    const { value } = this.state;
    if ('focused' in nextProps) {
      this.setState({
        focused: nextProps.focused,
      });
    }

    if ('value' in nextProps && value !== nextProps.value ) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentWillUnmount() {
    if (this.onBlurTimeout) {
      clearTimeout(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }
  }

  onFocus = (e) => {
    const value = e.target.value;
    if (!('focused' in this.props)) {
      this.setState({
        focused: true,
      });
    }

    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(value);
    }
  }

  onBlur = (e) => {
    const { onBlur } = this.props;
    const value = e.target.value;
    this.onBlurTimeout = setTimeout(() => {
      if (!this.blurFromClear && document.activeElement !== this.input) {
        this.setState({
          focused: false,
        });

        if (typeof onBlur === 'function') {
          onBlur(value);
        }
      }
      this.blurFromClear = false;
    }, 0);
  }

  handleComposition(e) {
    if (e.type === 'compositionstart') {
      this.setState({
        isOnComposition: true,
      });
      if (this.props.onCompositionStart) {
        this.props.onCompositionStart(e);
      }
    }

    if (e.type === 'compositionupdate') {
      if (this.props.onCompositionUpdate) {
        this.props.onCompositionUpdate(e);
      }
    }

    if (e.type === 'compositionend') {
      // composition is end
      this.setState({
        isOnComposition: false,
      });
      const value = e.target.value;
      if (this.props.onCompositionEnd) {
        this.props.onCompositionEnd(e);
      }
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
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
    if (onChange) {
      onChange(e.target.value);
    }
  }

  onClear() {
    this.blurFromClear = true;
    const { value } = this.state;
    this.setState({
      value: '',
    });
    if (!this.state.isOnComposition) {
      this.focus();
    }
    if (this.props.onClear) {
      this.props.onClear(value);
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  render() {
    const { prefixCls, className, disabled, onClear, clearable, type, ...others } = this.props;
    const { value, focused } = this.state;
    const cls = classnames(prefixCls, `${prefixCls}-${type}`, className, {
      disabled,
      clearable,
    });
    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: !!(focused && value && value.length > 0),
    });
    return (
      <div className={cls}>
        <input
          {...others}
          autoComplete="off"
          ref={(ele) => { this.input = ele; }}
          type={type}
          disabled={disabled}
          value={value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onCompositionStart={(e) => { this.handleComposition(e); }}
          onCompositionUpdate={(e) => { this.handleComposition(e); }}
          onCompositionEnd={(e) => { this.handleComposition(e); }}
        />
        {clearable && <Icon type="wrong-round-fill" className={clearCls} onClick={() => { this.onClear(); }} />}
      </div>
    );
  }
}
