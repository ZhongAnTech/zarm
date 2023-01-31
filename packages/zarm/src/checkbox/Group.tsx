import React, { FC } from 'react';
import { useControllableValue } from '../utils/hooks';
import { CheckboxGroupContext } from './context';
import type { BaseCheckboxGroupProps } from './interface';

export type CheckboxGroupProps = BaseCheckboxGroupProps;

const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const [value, setValue] = useControllableValue(props, { defaultValue: [] });

  return (
    <CheckboxGroupContext.Provider
      value={{
        value,
        disabled: props.disabled,
        check: (v) => {
          const values = [...value, v];
          setValue(values);
        },
        uncheck: (v) => {
          const values = value.filter((item) => item !== v);
          setValue(values);
        },
      }}
    >
      {props.children}
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.defaultProps = {
  block: false,
  disabled: false,
};

export default CheckboxGroup;
