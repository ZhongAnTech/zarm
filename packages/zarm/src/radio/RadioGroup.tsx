import * as React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
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

export type RadioGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'value' | 'onChange'
> &
  BaseRadioGroupProps;

const RadioGroup = React.forwardRef<unknown, RadioGroupProps>((props, ref) => {
  const {
    type,
    disabled,
    className,
    value,
    defaultValue,
    size,
    shape,
    block,
    compact,
    ghost,
    children,
    onChange,
    ...rest
  } = props;

  const radioGroupRef = (ref as any) || React.createRef<HTMLDivElement>();
  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, children }),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-radio-group`;

  const onChildChange = (newValue: RadioValue) => {
    setCurrentValue(newValue);
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const items = React.Children.map(children, (element: React.ReactElement, index: number) => {
    return React.cloneElement(element, {
      key: +index,
      type,
      shape,
      disabled: disabled || !!element.props.disabled,
      checked: currentValue === element.props.value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        typeof element.props.onChange === 'function' && element.props.onChange(e);
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

RadioGroup.displayName = 'RadioGroup';

RadioGroup.defaultProps = {
  shape: 'radius',
  block: false,
  disabled: false,
  compact: false,
  ghost: false,
  size: 'xs',
};

export default RadioGroup;
