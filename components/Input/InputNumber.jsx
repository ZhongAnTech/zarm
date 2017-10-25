import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class InputNumber extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const { prefixCls, className, disabled, ...others } = this.props;
    const cls = classnames(prefixCls, `${prefixCls}-number`, className, disabled);

    return (
      <div className={cls} {...others}>
        <input
          {...others}
          ref={(ele) => { this.input = ele; }}
          pattern="[0-9]*"
          type="number"
          disabled={disabled}
          />
      </div>
    );
  }
}

InputNumber.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
};

InputNumber.defaultProps = {
  prefixCls: 'za-input',
  disabled: false,
};

export default InputNumber;
