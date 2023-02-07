import { ReactNode } from 'react';

export type RadioType = 'button' | 'list';
export type RadioValue = number | string;
export type RadioGroupListIconAlign = 'before' | 'after';

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
  type?: RadioType;
  disabled?: boolean;
  block?: boolean;
  compact?: boolean;
  defaultValue?: RadioValue;
  value?: RadioValue;
  onChange?: (value: RadioValue) => void;
  children?: ReactNode;
  listIconAlign?: RadioGroupListIconAlign;
}
