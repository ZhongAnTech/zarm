import React, { cloneElement, ReactNode, isValidElement, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { BaseCheckboxGroupProps, CheckboxValue } from './interface';

const getChildChecked = (children: ReactNode) => {
  const checkedValue: Array<number | string> = [];

  React.Children.map(children, (element: ReactNode) => {
    if (React.isValidElement(element) && element.props && element.props.checked) {
      checkedValue.push(element.props.value);
    }
  });

  return checkedValue;
};

const getValue = (props: CheckboxGroupProps, defaultValue: Array<CheckboxValue> = []) => {
  if (props.value != null) return props.value;
  if (props.defaultValue != null) return props.defaultValue;
  if (getChildChecked(props.children).length > 0) {
    return getChildChecked(props.children);
  }
  return defaultValue;
};

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>,
    BaseCheckboxGroupProps {
  prefixCls?: string;
}

export interface CheckboxGroupStates {
  value?: Array<number | string>;
}

const CheckboxGroup = React.forwardRef<unknown, CheckboxGroupProps>((props, ref) => {
  const {
    prefixCls,
    className,
    size,
    shape,
    type,
    block,
    disabled,
    compact,
    ghost,
    children,
    onChange,
    defaultValue,
    value,
    ...rest
  } = props;

  const radioGroupRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, children }, defaultValue),
  );

  const onChildChange = (newValue: string | number) => {
    const values = currentValue!.slice();
    const index = values.indexOf(newValue);

    if (index < 0) {
      values.push(newValue);
    } else {
      values.splice(index, 1);
    }
    setCurrentValue(values);

    typeof onChange === 'function' && onChange(values);
  };

  const items = React.Children.map(children, (element: ReactNode, index) => {
    if (!isValidElement(element)) return null;
    return cloneElement(element, {
      key: index,
      type,
      shape,
      disabled: disabled || element.props.disabled,
      checked: currentValue!.indexOf(element.props.value) > -1,
      onChange: (checked: boolean) => {
        typeof element.props.onChange === 'function' && element.props.onChange(checked);
        onChildChange(element.props.value);
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

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue, children }));
  }, [value, defaultValue, children]);

  return (
    <div className={cls} {...rest} ref={radioGroupRef}>
      <div className={`${prefixCls}__inner`}>{items}</div>
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.defaultProps = {
  prefixCls: 'za-checkbox-group',
  shape: 'radius',
  block: false,
  disabled: false,
  compact: false,
  ghost: false,
  size: 'xs',
};

export default CheckboxGroup;
