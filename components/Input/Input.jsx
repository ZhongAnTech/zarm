import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputNumber from './InputNumber';
import InputText from './InputText';
import InputTextarea from './InputTextarea';

class Input extends PureComponent {

  render() {
    const { type, autosize, ...others } = this.props;

    switch (type) {
      case 'number':
        return <InputNumber ref={(ele) => { this.input = ele; }} {...others} />;

      case 'textarea':
        return <InputTextarea ref={(ele) => { this.input = ele; }} autosize={autosize} {...others} />;

      default:
        return <InputText ref={(ele) => { this.input = ele; }} {...others} />;
    }
  }
}

Input.propTypes = {
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
