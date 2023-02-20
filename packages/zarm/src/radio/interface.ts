import { ReactNode } from 'react';

export type RadioValue = number | string;

export interface BaseRadioProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  value?: RadioValue;
  id?: string;
  indeterminate?: boolean;
  children?: ReactNode;
}

export interface BaseRadioGroupProps {
  type?: 'button' | 'list';
  disabled?: boolean;
  block?: boolean;
  compact?: boolean;
  defaultValue?: RadioValue;
  value?: RadioValue;
  onChange?: (value: RadioValue) => void;
  children?: ReactNode;
  listIconAlign?: 'before' | 'after';
}
