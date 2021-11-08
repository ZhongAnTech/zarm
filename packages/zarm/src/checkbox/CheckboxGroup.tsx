import * as React from 'react';
import classnames from 'classnames';
import List from '../list';
import { ConfigContext } from '../n-config-provider';
import type { BaseCheckboxGroupProps, CheckboxValue } from './interface';

const getChildChecked = (children: React.ReactNode): Array<CheckboxValue> => {
  const checkedValues: Array<CheckboxValue> = [];

  React.Children.map(children, (element: React.ReactNode) => {
    if (React.isValidElement(element) && element.props && element.props.checked) {
      checkedValues.push(element.props.value);
    }
  });

  return checkedValues;
};

const getValue = (props: CheckboxGroupProps, defaultValue: Array<CheckboxValue> = []) => {
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

export type CheckboxGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'value' | 'onChange'
> &
  BaseCheckboxGroupProps;

const CheckboxGroup = React.forwardRef<unknown, CheckboxGroupProps>((props, ref) => {
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

  const checkboxGroupRef = (ref as any) || React.createRef<HTMLElement>();
  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, children }, []),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-checkbox-group`;

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

  const items = React.Children.map(children, (element: React.ReactElement, index: number) => {
    return React.cloneElement(element, {
      key: +index,
      type,
      listMarkerAlign,
      disabled: disabled || !!element.props.disabled,
      checked: currentValue!.indexOf(element.props.value) > -1,
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
    setCurrentValue(getValue({ value, defaultValue, children }, []));
  }, [value, defaultValue, children]);

  return (
    <div className={cls} {...restProps} ref={checkboxGroupRef}>
      <div className={`${prefixCls}__inner`}>{type === 'list' ? <List>{items}</List> : items}</div>
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.defaultProps = {
  block: false,
  disabled: false,
  buttonCompact: false,
  buttonGhost: false,
  buttonShape: 'radius',
  buttonSize: 'xs',
  listMarkerAlign: 'before',
};

export default CheckboxGroup;
