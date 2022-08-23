import * as React from 'react';
import { createBEM } from '@zarm-design/bem';
import List from '../list';
import { ConfigContext } from '../n-config-provider';
import type { BaseCheckboxGroupProps, CheckboxValue } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface CheckboxGroupCssVars {
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

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

export type CheckboxGroupProps = BaseCheckboxGroupProps & HTMLProps<CheckboxGroupCssVars>;

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

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('checkbox-group', { prefixCls });

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
      buttonGhost,
      buttonSize,
      buttonShape,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        typeof element.props.onChange === 'function' && element.props.onChange(e);
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
    setCurrentValue(getValue({ value, defaultValue, children }, []));
  }, [value, defaultValue, children]);

  return (
    <div className={cls} {...restProps} ref={checkboxGroupRef}>
      <div className={bem('inner')}>{type === 'list' ? <List>{items}</List> : items}</div>
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
