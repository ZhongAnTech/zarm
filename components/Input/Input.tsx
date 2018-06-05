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

  render() {
    const { type, ...others } = this.props;
    switch (type) {
      case 'idcard':
      case 'price':
      case 'number':
        return <InputNumber {...others} type={type} />;

      case 'textarea':
        return <InputTextarea {...others} />;

      default:
        return <InputBase {...others} type={type} />;
    }
  }

}
