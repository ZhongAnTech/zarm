import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InputNumber from './InputNumber';
import InputText from './InputText';
import InputTextarea from './InputTextarea';

class Input extends PureComponent {

  render() {
    const { type, ...others } = this.props;

    switch (type) {
      case 'number':
        return <InputNumber {...others} />;

      case 'textarea':
        return <InputTextarea {...others} />;

      default:
        return <InputText {...others} />;
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
