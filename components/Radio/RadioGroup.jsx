import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function getChildChecked(children) {
  let checkedValue = null;
  React.Children.forEach(children, (element) => {
    if (element.props && element.props.checked) {
      checkedValue = element.props.value;
    }
  });
  return checkedValue;
}

function getValue(props, defaultValue) {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  if (getChildChecked(props.children)) {
    return getChildChecked(props.children);
  }
  return defaultValue;
}

class RadioGroup extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, null),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getChildChecked(nextProps.children)) {
      this.setState({
        value: nextProps.value || getChildChecked(nextProps.children),
      });
    }
  }

  onChildChange = (value) => {
    this.setState({ value });
    const { onChange } = this.props;
    typeof onChange === 'function' && onChange(value);
  }

  render() {
    const { prefixCls, className, theme, shape, type, block, disabled, compact, children } = this.props;

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        key: index,
        type,
        theme,
        shape,
        block: block || element.props.block,
        disabled: disabled || element.props.disabled,
        onChange: () => this.onChildChange(element.props.value),
        // use '==' because the result will fail when the value's typeof is Number
        checked: (this.state.value == element.props.value), // eslint-disable-line
      });
    });

    const cls = classnames(`${prefixCls}`, className, {
      [`shape-${shape}`]: !!shape,
      'is-compact': compact,
      block,
      disabled,
    });

    return <div className={cls}>{items}</div>;
  }
}

RadioGroup.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  shape: PropTypes.oneOf(['radius', 'round']),
  type: PropTypes.oneOf(['button', 'cell']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  compact: PropTypes.bool,
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  prefixCls: 'za-radio-group',
  theme: 'primary',
  block: false,
  disabled: false,
  compact: false,
};

export default RadioGroup;
