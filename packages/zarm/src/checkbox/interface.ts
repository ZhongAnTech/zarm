import { ReactNode } from 'react';

export type CheckboxType = 'button' | 'list';
export type CheckboxValue = number | string;
export type CheckboxGroupListIconAlign = 'before' | 'after';

export interface BaseCheckboxProps {
  disabled?: boolean;
  defaultChecked?: boolean;
  checked?: boolean;
  value?: CheckboxValue;
  id?: string;
  indeterminate?: boolean;
  children?: ReactNode;
}

export interface BaseCheckboxGroupProps {
  type?: CheckboxType;
  disabled?: boolean;
  block?: boolean;
  listIconAlign?: CheckboxGroupListIconAlign;
  defaultValue?: Array<CheckboxValue>;
  value?: Array<CheckboxValue>;
  onChange?: (value: Array<CheckboxValue>) => void;
  children?: ReactNode;
}
