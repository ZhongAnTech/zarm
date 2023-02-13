import { createContext } from 'react';
import type { CheckboxGroupProps, CheckboxProps } from '.';

export const CheckboxGroupContext = createContext<{
  type: CheckboxGroupProps['type'];
  value: CheckboxGroupProps['value'];
  block: boolean;
  disabled: boolean;
  iconAlign: CheckboxGroupProps['iconAlign'];
  check: (value: CheckboxProps['value']) => void;
  uncheck: (value: CheckboxProps['value']) => void;
}>(null);
