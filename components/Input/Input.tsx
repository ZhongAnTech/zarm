import React, { PureComponent } from 'react';
import { BaseInputProps } from './PropsType';
import InputNumber from './InputNumber';
import InputText from './InputText';
import InputTextarea from './InputTextarea';

export interface InputProps extends BaseInputProps {}

export default class Input extends PureComponent<InputProps, {}> {

  static defaultProps = {
    type: 'text',
    autosize: false,
  };

  render() {
    const { type, autosize, ...others } = this.props;

    switch (type) {
      case 'idcard':
      case 'price':
      case 'number':
        return <InputNumber {...others} type={type} />;

      case 'textarea':
        return <InputTextarea {...others} autosize={autosize} />;

      default:
        return <InputText {...others} />;
    }
  }
}
