import React, { PureComponent, cloneElement, ReactNode, isValidElement } from 'react';
import classnames from 'classnames';
import { BaseCheckboxGroupProps } from './PropsType';

const getChildChecked = (children: ReactNode) => {
  const checkedValue: Array<number | string> = [];

  React.Children.map(children, (element: ReactNode) => {
    if (React.isValidElement(element)
      && element.props
      && element.props.checked) {
      checkedValue.push(element.props.value);
    }
  });

  return checkedValue;
};

const getValue = (props: CheckboxGroup['props'], defaultValue: BaseCheckboxGroupProps['defaultValue']) => {
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
};

export interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
}

export interface CheckboxGroupStates {
  value?: Array<number | string>;
}

export default class CheckboxGroup extends PureComponent<CheckboxGroupProps, CheckboxGroupStates> {
  static displayName = 'CheckboxGroup';

  static defaultProps = {
    prefixCls: 'za-checkbox-group',
    shape: 'radius',
    block: false,
    disabled: false,
  };

  constructor(props: CheckboxGroup['props']) {
    super(props);
    this.state = {
      value: getValue(props, []),
    };
  }

  static getDerivedStateFromProps(nextProps: CheckboxGroup['props']) {
    if ('value' in nextProps || getChildChecked(nextProps.children).length > 0) {
      return {
        value: nextProps.value || getChildChecked(nextProps.children),
      };
    }

    return null;
  }

  onChildChange = (value: string | number) => {
    const { value: valueState } = this.state;

    const values = valueState!.slice();

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
    if (typeof onChange === 'function') {
      onChange(values);
    }
  };

  render() {
    const { prefixCls, className, shape, type, block, disabled, children } = this.props;
    const { value } = this.state;

    const items = React.Children.map(children, (element: ReactNode, index) => {
      if (isValidElement(element)) {
        return cloneElement(element, {
          key: index,
          type,
          shape,
          block: block || element.props.block,
          disabled: disabled || element.props.disabled,
          checked: value!.indexOf(element.props.value) > -1,
          onChange: () => this.onChildChange(element.props.value),
        });
      }

      return null;
    });

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--block`]: block,
      [`${prefixCls}--disabled`]: disabled,
    });

    return <div className={cls}>{items}</div>;
  }
}
