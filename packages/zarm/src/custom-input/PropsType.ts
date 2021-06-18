import * as React from 'react';

export interface BaseCustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onFocus' | 'onBlur'> {
  type?: 'number' | 'price' | 'idcard';
  clearable?: boolean;
  onChange?: (value?: string) => void;
  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
}
