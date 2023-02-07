import { createBEM } from '@zarm-design/bem';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../config-provider';
import List from '../list';
import type { HTMLProps } from '../utils/utilityTypes';
import { RadioGroupContext } from './context';
import type { BaseRadioGroupProps, RadioValue } from './interface';

export interface RadioGroupCssVars {
  '--group-spacing-vertical'?: React.CSSProperties['marginBottom'];
  '--group-spacing-horizontal'?: React.CSSProperties['marginRight'];
}

const getValue = (props: RadioGroupProps, defaultValue?: RadioValue) => {
  return props.value ?? props.defaultValue ?? defaultValue;
};

export type RadioGroupProps = BaseRadioGroupProps & HTMLProps<RadioGroupCssVars>;

const RadioGroup: FC<RadioGroupProps> = (props) => {
  const [value, setValue] = useState(getValue(props));
  const { type, block, disabled, listIconAlign, compact, className, style } = props;
  const { prefixCls } = useContext(ConfigContext);

  const bem = createBEM('radio-group', { prefixCls });
  const cls = bem([
    {
      [`${type}`]: !!type,
      block,
      disabled,
      'button-compact': compact,
    },
    className,
  ]);

  useEffect(() => {
    if (props.value === undefined) return;
    if (props.value === value) return;
    setValue(getValue(props));
    props.onChange?.(props.value);
  }, [props.value]);

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        type,
        block,
        disabled,
        listIconAlign,
        compact,
        check: (v) => {
          setValue(v);
          props.onChange?.(v);
        },
        uncheck: () => {},
      }}
    >
      <div className={cls} style={style}>
        <div className={bem('inner')}>
          {type === 'list' ? <List>{props.children}</List> : props.children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

RadioGroup.defaultProps = {
  block: false,
  disabled: false,
  compact: false,
  listIconAlign: 'before',
};

export default RadioGroup;
