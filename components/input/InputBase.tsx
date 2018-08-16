import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { InputBaseProps } from './PropsType';
import Icon from '../icon';

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
      focused: false,
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
    this.setState({
      focused: true,
    });

    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e.target.value);
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
    const { onCompositionStart, onCompositionUpdate, onCompositionEnd, onChange } = this.props;

    if (e.type === 'compositionstart') {
      this.setState({
        isOnComposition: true,
      });
      if (typeof onCompositionStart === 'function') {
        onCompositionStart(e);
      }
    }

    if (e.type === 'compositionupdate') {
      if (typeof onCompositionUpdate === 'function') {
        onCompositionUpdate(e);
      }
    }

    if (e.type === 'compositionend') {
      // composition is end
      this.setState({
        isOnComposition: false,
      });
      const value = e.target.value;
      if (typeof onCompositionEnd === 'function') {
        onCompositionEnd(e);
      }
      if (typeof onChange === 'function') {
        onChange(value);
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
    this.setState({
      value: '',
    });
    if (!this.state.isOnComposition) {
      this.focus();
    }
    if (this.props.onChange) {
      this.props.onChange('');
    }
    if (this.props.onClear) {
      this.props.onClear('');
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  render() {
    const { prefixCls, className, disabled, clearable, type, value, onClear, ...others } = this.props;
    const valueState = this.state.value;
    const focused = this.state.focused;

    const showClearIcon = clearable && ('value' in this.props) && ('onChange' in this.props);

    const cls = classnames(prefixCls, `${prefixCls}-${type}`, className, {
      disabled,
      clearable: showClearIcon,
    });
    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: !!(focused && valueState && valueState.length > 0),
    });

    const valueProps: any = {};
    if ('value' in this.props) {
      valueProps.value = valueState;
    }

    return (
      <div className={cls}>
        <input
          {...others}
          {...valueProps}
          autoComplete="off"
          ref={(ele) => { this.input = ele; }}
          type={type}
          disabled={disabled}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onCompositionStart={(e) => { this.handleComposition(e); }}
          onCompositionUpdate={(e) => { this.handleComposition(e); }}
          onCompositionEnd={(e) => { this.handleComposition(e); }}
        />
        {showClearIcon && <Icon type="wrong-round-fill" className={clearCls} onClick={() => { this.onClear(); }} />}
      </div>
    );
  }
}
