import * as React from 'react';
import classnames from 'classnames';
import List from '../list';
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
    className,
    value,
    defaultValue,
    block,
    disabled,
    buttonSize,
    buttonShape,
    buttonCompact,
    buttonGhost,
    listMarkerAlign,
    children,
    onChange,
    ...restProps
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
      listMarkerAlign,
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
    [`${prefixCls}--block`]: block,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--button-${buttonSize}`]: !!buttonSize,
    [`${prefixCls}--button-${buttonShape}`]: !!buttonShape,
    [`${prefixCls}--button-compact`]: buttonCompact,
    [`${prefixCls}--button-ghost`]: buttonGhost,
  });

  React.useEffect(() => {
    setCurrentValue(getValue({ value, defaultValue, children }));
  }, [value, defaultValue, children]);

  return (
    <div className={cls} {...restProps} ref={radioGroupRef}>
      <div className={`${prefixCls}__inner`}>{type === 'list' ? <List>{items}</List> : items}</div>
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';

RadioGroup.defaultProps = {
  block: false,
  disabled: false,
  buttonCompact: false,
  buttonGhost: false,
  buttonShape: 'radius',
  buttonSize: 'xs',
  listMarkerAlign: 'before',
};

export default RadioGroup;
