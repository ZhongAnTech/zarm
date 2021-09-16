import { ReactNode } from 'react';

export type CustomInputType = 'number' | 'price' | 'idcard';

export interface BaseCustomInputProps {
  type?: CustomInputType;
  label?: ReactNode;
  vertical?: boolean;
  clearable?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
  onBlur?: (value: string) => void;
}
