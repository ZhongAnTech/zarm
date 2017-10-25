import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class InputText extends PureComponent {

  render() {
    const { prefixCls, className, disabled, focused, ...others } = this.props;
    const cls = classnames(prefixCls, `${prefixCls}-text`, className, disabled);
    return (
      <div className={cls}>
        <input
          {...others}
          ref={(ele) => { this.input = ele; }}
          type="text"
          disabled={disabled}
          />
      </div>
    );
  }
}

InputText.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
};

InputText.defaultProps = {
  prefixCls: 'za-input',
  disabled: false,
};

export default InputText;
