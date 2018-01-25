import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import { BaseRadioGroupProps } from './PropsType';

const getChildChecked = (children) => {
  let checkedValue = null;
  React.Children.forEach(children, (element: any) => {
    if (element.props && element.props.checked) {
      checkedValue = element.props.value;
    }
  });
  return checkedValue;
};

const getValue = (props, defaultValue) => {
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
};

export interface RadioGroupProps extends BaseRadioGroupProps {
  prefixCls?: string;
  className?: string;
}

export default class RadioGroup extends PureComponent<RadioGroupProps, any> {

  static defaultProps = {
    prefixCls: 'za-radio-group',
    theme: 'primary',
    block: false,
    disabled: false,
    compact: false,
  };

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
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  render() {
    const { prefixCls, className, theme, shape, type, block, disabled, compact, children } = this.props;

    const items = React.Children.map(children, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        type,
        theme,
        shape,
        block: block || element.props.block,
        disabled: disabled || element.props.disabled,
        onChange: () => this.onChildChange(element.props.value),
        checked: this.state.value === element.props.value || Number(this.state.value) === Number(element.props.value),
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
