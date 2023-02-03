import { createContext } from 'react';
import type { CheckboxGroupProps, CheckboxProps } from '.';

export const CheckboxGroupContext = createContext<{
  type: CheckboxGroupProps['type'];
  value: CheckboxGroupProps['value'];
  block: boolean;
  disabled: boolean;
  listIconAlign: CheckboxGroupProps['listIconAlign'];
  check: (value: CheckboxProps['value']) => void;
  uncheck: (value: CheckboxProps['value']) => void;
}>(null);
