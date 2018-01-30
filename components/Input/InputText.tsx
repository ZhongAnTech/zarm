import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseInputTextProps } from './PropsType';

export interface InputTextProps extends BaseInputTextProps {
  prefixCls?: string;
  className?: string;
}

export default class InputText extends PureComponent<InputTextProps, any> {

  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
    focused: false,
  };

  private input;

  constructor(props) {
    super(props);
    this.state = {
      focused: props.focused || false,
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
  }

  componentDidUpdate() {
    if (this.state.focused) {
      this.input.focus();
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
    if (!('focused' in this.props)) {
      this.setState({
        focused: false,
      });
    }
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur(e.target.value);
    }
  }

  onChange = (e) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(e.target.value);
    }
  }

  render() {
    const { prefixCls, className, disabled, focused, ...others } = this.props;
    const cls = classnames(prefixCls, `${prefixCls}-text`, className, {
      disabled,
    });

    return (
      <div className={cls}>
        <input
          {...others}
          ref={(ele) => { this.input = ele; }}
          type="text"
          disabled={disabled}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}
