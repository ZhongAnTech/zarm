import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function getChildChecked(children) {
  const checkedValue = [];
  React.Children.forEach(children, (element) => {
    if (element.props && element.props.checked) {
      checkedValue.push(element.props.value);
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
  if (getChildChecked(props.children).length > 0) {
    return getChildChecked(props.children);
  }
  return defaultValue;
}

class CheckboxGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, []),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getChildChecked(nextProps.children).length > 0) {
      this.setState({
        value: nextProps.value || getChildChecked(nextProps.children),
      });
    }
  }

  onChildChange = (value) => {
    const values = this.state.value;
    const index = values.indexOf(value);

    if (index < 0) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }

    this.setState({
      value: values,
    });

    const { onChange } = this.props;
    typeof onChange === 'function' && onChange(values);
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
        checked: (this.state.value.indexOf(element.props.value) > -1),
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

CheckboxGroup.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  shape: PropTypes.oneOf(['radius', 'round']),
  type: PropTypes.oneOf(['button', 'cell']),
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  defaultValue: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), // eslint-disable-line
  block: PropTypes.bool,
  disabled: PropTypes.bool,
  compact: PropTypes.bool,
  onChange: PropTypes.func,
};

CheckboxGroup.defaultProps = {
  prefixCls: 'za-checkbox-group',
  theme: 'primary',
  block: false,
  disabled: false,
  compact: false,
};

export default CheckboxGroup;
