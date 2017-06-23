
import React, { Component } from 'react';
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

class Switch extends Component {

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
    const props = this.props;
    const { prefixCls, className, theme, size, shape, isDisabled } = this.props;
    const { checked } = this.state;
    const disabled = 'disabled' in props || isDisabled;

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
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  shape: PropTypes.oneOf(['radius', 'round', 'circle']),
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  prefixCls: 'ui-switch',
  className: null,
  theme: null,
  size: null,
  shape: null,
  onChange: () => {},
};

export default Switch;
