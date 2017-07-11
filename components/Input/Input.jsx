import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Input extends PureComponent {

  render() {
    const props = this.props;
    const { prefixCls, placeholder, type, isRadius, isDisabled, size, defaultValue, className, ...others } = this.props;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    const cls = classnames({
      [`${prefixCls}`]: true,
      disabled,
      radius,
      [`size-${size}`]: size,
      [className]: !!className,
    });

    const input = (type === 'textarea')
               ? <textarea {...others} className={cls} placeholder={placeholder} disabled={disabled}>{defaultValue}</textarea>
               : <input {...others} type={type} className={cls} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} />;

    const valueText = (type === 'date')
                    ? <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
                    : null;

    return (
      <span className={cls}>
        {valueText}
        {input}
      </span>
    );
  }

}

Input.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isRadius: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  prefixCls: 'ui-input',
  type: 'text',
  size: null,
  isRadius: false,
  isDisabled: false,
  className: null,
};

export default Input;
