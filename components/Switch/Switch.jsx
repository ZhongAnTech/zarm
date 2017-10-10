import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function getChecked(props, defaultChecked) {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
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
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onValueChange = () => {
    const { disabled, onChange } = this.props;
    if (disabled) return;

    const checked = !this.state.checked;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const { prefixCls, className, theme, disabled } = this.props;
    const { checked } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      checked,
      disabled,
    });

    return (
      <span className={cls}>
        <input type="checkbox" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
      </span>
    );
  }
}

Switch.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool, // eslint-disable-line
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  prefixCls: 'za-switch',
  theme: 'primary',
  disabled: false,
};

export default Switch;
