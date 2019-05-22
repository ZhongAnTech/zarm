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
    const { type } = this.props;

    if (type === 'text' && 'rows' in this.props) {
      return <InputTextarea type={type} ref={(ele) => { this.input = ele; }} {...this.props} />;
    }

    switch (type) {
      case 'idcard':
      case 'price':
      case 'number':
        return <InputNumber type={type} ref={(ele) => { this.input = ele; }} {...this.props as InputNumberProps} />;

      case 'text':
      case 'search':
      case 'password':
        return <InputBase type={type} ref={(ele) => { this.input = ele; }} {...this.props as InputBaseProps} />;

      default:
        return <InputBase type={type} ref={(ele) => { this.input = ele; }} {...this.props as InputBaseProps} />;
    }
  }
}
