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

  constructor(props) {
    super(props);
  }

  render() {
    const { type, ...others } = this.props;
    switch (type) {
      case 'idcard':
      case 'price':
      case 'number':
        return <InputNumber ref={ele => (this.input = ele)} {...others} type={type} />;

      case 'textarea':
        return <InputTextarea ref={ele => (this.input = ele)} {...others} />;

      default:
        return <InputBase ref={ele => (this.input = ele)} {...others} type={type} />;
    }
  }

}
