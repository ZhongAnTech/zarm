import React, { PureComponent } from 'react';
import { InputBaseProps, InputNumberProps, InputTextareaProps } from './PropsType';
import InputNumber from './InputNumber';
import InputBase from './InputBase';
import InputTextarea from './InputTextarea';

export type InputProps = InputBaseProps | InputNumberProps | InputTextareaProps;

export default class Input extends PureComponent<InputProps, {}> {
  static defaultProps = {
    type: 'text',
  };

  private input;

  constructor(props) {
    super(props);
  }

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  render() {
    if (this.props.type === 'text' && 'rows' in this.props) {
      return <InputTextarea ref={ele => (this.input = ele)} {...this.props} />;
    }

    switch (this.props.type) {
      case 'idcard':
      case 'price':
      case 'number':
        return <InputNumber ref={ele => (this.input = ele)} {...this.props} />;

      case 'text':
      case 'search':
      case 'password':
        return <InputBase ref={ele => (this.input = ele)} {...this.props} />;

      default:
        return <InputBase ref={ele => (this.input = ele)} {...this.props as InputBaseProps} />;
    }
  }
}
