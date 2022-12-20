import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import isEqual from 'lodash/isEqual';
import List from '../list';
import { ConfigContext } from '../config-provider';
import type { BaseRadioGroupProps, RadioValue } from './interface';
import type { HTMLProps, Nullable } from '../utils/utilityTypes';

export interface RadioGroupCssVars {
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

export type RadioGroupProps = BaseRadioGroupProps & HTMLProps<RadioGroupCssVars>;

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

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('radio-group', { prefixCls });

  const onChildChange = (newValue: RadioValue) => {
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  const items = React.Children.map(children, (element: React.ReactElement, index: number) => {
    return React.cloneElement(element, {
      key: +index,
      type,
      disabled: disabled || !!element.props.disabled,
      checked: currentValue === element.props.value,
      listMarkerAlign,
      buttonGhost,
      buttonSize,
      buttonShape,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        element.props.onChange?.(e);
        onChildChange(element.props.value);
      },
    });
  });

  const cls = bem([
    {
      [`${type}`]: !!type,
      block,
      disabled,
      [`button-${buttonSize}`]: !!buttonSize,
      [`button-${buttonShape}`]: !!buttonShape,
      'button-compact': buttonCompact,
    },
    className,
  ]);

  React.useEffect(() => {
    if (props.value === undefined) return;
    if (isEqual(props.value, currentValue)) return;
    setCurrentValue(getValue({ value, defaultValue, children }));
  }, [value, defaultValue, children]);

  return (
    <div className={cls} {...restProps} ref={radioGroupRef}>
      <div className={bem('inner')}>{type === 'list' ? <List>{items}</List> : items}</div>
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
