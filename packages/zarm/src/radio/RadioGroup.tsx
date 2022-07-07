import * as React from 'react';
import classnames from 'classnames';
import List from '../list';
import { ConfigContext } from '../n-config-provider';
import type { BaseRadioGroupProps, RadioValue } from './interface';
import type { HTMLProps, Nullable } from '../utils/utilityTypes';

export interface RadioGroupCssVars {
  '--widget-size'?: React.CSSProperties['height'];
  '--widget-background'?: React.CSSProperties['background'];
  '--widget-border-radius'?: React.CSSProperties['borderRadius'];
  '--widget-border-width'?: React.CSSProperties['borderWidth'];
  '--widget-border-color'?: React.CSSProperties['borderColor'];
  '--marker-font-size'?: React.CSSProperties['fontSize'];
  '--marker-color'?: React.CSSProperties['color'];
  '--marker-transition'?: React.CSSProperties['transition'];
  '--text-margin-horizontal'?: React.CSSProperties['marginLeft'];
  '--active-opacity'?: React.CSSProperties['opacity'];
  '--checked-widget-background'?: React.CSSProperties['background'];
  '--checked-widget-border-color'?: React.CSSProperties['borderColor'];
  '--disabled-widget-background'?: React.CSSProperties['background'];
  '--disabled-widget-border-color'?: React.CSSProperties['borderColor'];
  '--disabled-text-color'?: React.CSSProperties['color'];
  '--disabled-marker-color'?: React.CSSProperties['color'];
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
      buttonGhost,
      buttonSize,
      buttonShape,
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
