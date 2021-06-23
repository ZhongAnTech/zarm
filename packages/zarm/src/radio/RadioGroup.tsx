import * as React from 'react';
import classnames from 'classnames';
import type { BaseRadioGroupProps, RadioValue } from './interface';
import type { Nullable } from '../utils/utilityTypes';

const getChildChecked = (children: React.ReactNode): Nullable<RadioValue> => {
  let checkedValue = null;
  React.Children.forEach(children, (element: React.ReactNode) => {
    if (React.isValidElement(element) && element.props && element.props.checked) {
      checkedValue = element.props.value;
    }
  });
  return checkedValue;
};

const getValue = (
  props: RadioGroupProps,
  defaultValue: Nullable<RadioValue> = null,
): Nullable<RadioValue> => {
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

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'value' | 'onChange'>,
    BaseRadioGroupProps {
  prefixCls?: string;
}

const RadioGroup = React.forwardRef<unknown, RadioGroupProps>(
  (
    {
      prefixCls = 'za-radio-group',
      type,
      disabled = false,
      className,
      value,
      defaultValue,
      size = 'xs',
      shape = 'radius',
      block = false,
      compact = false,
      ghost = false,
      children,
      onChange,
      ...rest
    }: RadioGroupProps,
    ref,
  ) => {
    const radioGroupRef = (ref as any) || React.createRef<HTMLElement>();
    const [currentValue, setCurrentValue] = React.useState(
      getValue({ value, defaultValue, children }, defaultValue),
    );

    const onChildChange = (newValue: RadioValue) => {
      setCurrentValue(newValue);
      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    };

    const renderRadio = (element: React.ReactElement, index: number) => {
      return React.cloneElement(element, {
        key: index,
        type,
        shape,
        disabled: disabled || !!element.props.disabled,
        checked: currentValue === element.props.value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          typeof element.props.onChange === 'function' && element.props.onChange(e);
          onChildChange(element.props.value);
        },
      });
    };

    const radioRender = React.Children.map(children, renderRadio);

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
      setCurrentValue(getValue({ value, defaultValue, children }, defaultValue));
    }, [value, defaultValue, children]);

    return (
      <div className={cls} {...rest} ref={radioGroupRef}>
        <div className={`${prefixCls}__inner`}>{radioRender}</div>
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
RadioGroup.defaultProps = {
  prefixCls: 'za-radio-group',
  shape: 'radius',
  block: false,
  disabled: false,
  compact: false,
  ghost: false,
  size: 'xs',
};

export default RadioGroup;
