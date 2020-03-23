import React, { PureComponent, cloneElement, ReactNode, isValidElement, HTMLAttributes } from 'react';
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
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue;
  }
  if (getChildChecked(props.children).length > 0) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

export interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>, BaseCheckboxGroupProps {
  prefixCls?: string;
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
    compact: false,
    ghost: false,
    size: 'xs',
  };

  constructor(props: CheckboxGroup['props']) {
    super(props);
    this.state = {
      value: getValue(props, []),
    };
  }

  static getDerivedStateFromProps(nextProps: CheckboxGroup['props']) {
    if ('value' in nextProps) {
      return {
        value: getValue(nextProps, []),
      };
    }

    return null;
  }

  onChildChange = (value: string | number) => {
    const { value: valueState } = this.state;
    const { onChange } = this.props;
    const values = valueState!.slice();
    const index = values.indexOf(value);

    if (index < 0) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }

    this.setState({ value: values });
    typeof onChange === 'function' && onChange(values);
  };

  render() {
    const { prefixCls, className, size, shape, type, block, disabled, compact, ghost, children, onChange, defaultValue, value, ...rest } = this.props;
    const { value: valueState } = this.state;

    const items = React.Children.map(children, (element: ReactNode, index) => {
      if (isValidElement(element)) {
        return cloneElement(element, {
          key: index,
          type,
          shape,
          disabled: disabled || element.props.disabled,
          checked: valueState!.indexOf(element.props.value) > -1,
          onChange: (checked: boolean) => {
            typeof element.props.onChange === 'function' && element.props.onChange(checked);
            this.onChildChange(element.props.value);
          },
        });
      }

      return null;
    });

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${type}`]: !!type,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--block`]: block,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--compact`]: compact,
      [`${prefixCls}--ghost`]: ghost,
    });

    return <div className={cls} {...rest}><div className={`${prefixCls}__inner`}>{items}</div></div>;
  }
}
