import { createContext } from 'react';
import type { CheckboxGroupProps, CheckboxProps } from '.';

export const CheckboxGroupContext = createContext<{
  value: CheckboxGroupProps['value'];
  disabled: boolean;
  check: (value: CheckboxProps['value']) => void;
  uncheck: (value: CheckboxProps['value']) => void;
}>(null);
