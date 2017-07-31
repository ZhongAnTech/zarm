import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function getChecked(props, defaultChecked) {
  if ('checked' in props) {
    return props.checked;
  }
  if ('defaultChecked' in props) {
    return props.defaultChecked;
  }
  return defaultChecked;
}

class Switch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: getChecked(props, false),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps && nextProps.checked !== this.props.checked) {
      this.setState({
        checked: getChecked(nextProps, false),
      });
    }
  }

  _onClick() {
    const { onChange } = this.props;
    const checked = !this.state.checked;
    this.setState({
      checked,
    });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const { prefixCls, className, theme, size, shape, disabled } = this.props;
    const { checked } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      checked,
      disabled,
    });

    return (
      <span className={cls}>
        <input type="checkbox" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={() => !disabled && this._onClick(checked)} />
      </span>
    );
  }
}

Switch.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  shape: PropTypes.oneOf(['radius', 'round', 'circle']),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  prefixCls: 'zax-switch',
  className: null,
  theme: 'primary',
  size: null,
  shape: null,
  disabled: false,
  onChange() {},
};

export default Switch;
