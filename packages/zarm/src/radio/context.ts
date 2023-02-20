import { createContext } from 'react';
import type { RadioGroupProps, RadioProps } from '.';

export const RadioGroupContext = createContext<{
  type: RadioGroupProps['type'];
  value: RadioGroupProps['value'];
  block: RadioGroupProps['block'];
  disabled: RadioGroupProps['disabled'];
  compact: RadioGroupProps['compact'];
  listIconAlign: RadioGroupProps['listIconAlign'];
  check: (value: RadioProps['value']) => void;
}>(null);
