import React, { PureComponent } from 'react';
import { BaseInputProps } from './PropsType';
import InputNumber from './InputNumber';
import InputBase from './InputBase';
import InputTextarea from './InputTextarea';

export interface InputProps extends BaseInputProps {
}

export default class Input extends PureComponent<BaseInputProps, {}> {
  static defaultProps = {
    type: 'text',
  };

  private input;
  private inputNumber;

  constructor(props) {
    super(props);
  }

  focus() {
    if (this.inputNumber) {
      this.inputNumber.focus();
    }
  }

  blur() {
    if (this.inputNumber) {
      this.inputNumber.blur();
    }
  }

  render() {
    const { type, ...others } = this.props;
    switch (type) {
      case 'idcard':
      case 'price':
      case 'number':
        return <InputNumber ref={ele => (this.inputNumber = ele)} {...others} type={type} />;

      case 'textarea':
        return <InputTextarea ref={ele => (this.input = ele)} {...others} />;

      default:
        return <InputBase ref={ele => (this.input = ele)} {...others} type={type} />;
    }
  }
}
