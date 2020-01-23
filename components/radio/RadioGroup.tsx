import React, { HTMLAttributes, PureComponent, cloneElement, ReactNode, isValidElement } from 'react';
import classnames from 'classnames';
import { BaseRadioGroupProps } from './PropsType';

const getChildChecked = (children: ReactNode) => {
  let checkedValue = null;
  React.Children.forEach(children, (element: ReactNode) => {
    if (isValidElement(element)
      && element.props
      && element.props.checked
    ) {
      checkedValue = element.props.value;
    }
  });
  return checkedValue;
};

const getValue = (props: RadioGroup['props'], defaultValue: null) => {
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue;
  }
  if (getChildChecked(props.children)) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>, BaseRadioGroupProps {
  prefixCls?: string;
}

export interface RadioGroupStates {
  value?: string | number | null;
}

export default class RadioGroup extends PureComponent<RadioGroupProps, RadioGroupStates> {
  static displayName = 'RadioGroup';

  static defaultProps = {
    prefixCls: 'za-radio-group',
    shape: 'radius',
    block: false,
    disabled: false,
    compact: false,
    ghost: false,
    size: 'xs',
  };

  state: RadioGroupStates = {
    value: getValue(this.props, null),
  };

  static getDerivedStateFromProps(nextProps: RadioGroup['props']) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }

    return null;
  }

  onChildChange = (value: string | number) => {
    this.setState({ value });
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { prefixCls, className, size, shape, type, block, disabled, compact, ghost, children, onChange, defaultValue, value, ...rest } = this.props;
    const { value: valueState } = this.state;

    const items = React.Children.map(children, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        type,
        shape,
        disabled: disabled || element.props.disabled,
        checked: valueState === element.props.value,
        onChange: (checked: boolean) => {
          typeof element.props.onChange === 'function' && element.props.onChange(checked);
          this.onChildChange(element.props.value);
        },
      });
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
