
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: !!nextProps.value
      });
    }
  }

  render() {
    const props = this.props;
    const { size, isCheckedText, unCheckedText, isDisabled, ...others } = props;
    const { value } = this.state;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-switch'     : true,
      'checked'       : value,
      'disabled'      : disabled,
      [`size-${size}`]: !!size,
    });

    return (
      <span className={cls} onClick={() => !disabled && this._onClick()} {...others}>
        <span className="ui-switch-inner">{ value ? isCheckedText : unCheckedText }</span>
      </span>
    );
  }

  _onClick() {
    const value = !this.state.value;
    this.setState({
      value: value
    });
    this.props.onChange(value);
  }
}

Switch.propTypes = {
  size         : PropTypes.oneOf(['sm']),
  value        : PropTypes.bool,
  defaultValue : PropTypes.bool,
  isCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  unCheckedText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onChange     : PropTypes.func,
};

Switch.defaultProps = {
  size         : null,
  defaultValue : false,
  isCheckedText: '',
  unCheckedText: '',
  onChange     : () => {},
};

export default Switch;
