import { ReactNode } from 'react';

export type CheckboxValue = number | string;

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
  type?: 'button' | 'list';
  disabled?: boolean;
  block?: boolean;
  iconAlign?: 'before' | 'after';
  defaultValue?: Array<CheckboxValue>;
  value?: Array<CheckboxValue>;
  onChange?: (value: Array<CheckboxValue>) => void;
  children?: ReactNode;
}
