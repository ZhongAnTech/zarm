import { ChangeEvent } from 'react';

export type CheckboxType = 'button' | 'cell';
export type CheckboxShape = 'rect' | 'radius' | 'round';
export type CheckboxValue = number | string;

export interface BaseCheckboxProps {
  type?: CheckboxType;
  shape?: CheckboxShape;
  disabled?: boolean;
  value?: CheckboxValue;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  id?: string;
  onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseCheckboxGroupProps {
  type?: CheckboxType;
  shape?: CheckboxShape;
  disabled?: boolean;
  block?: boolean;
  value?: Array<CheckboxValue>;
  defaultValue?: Array<CheckboxValue>;
  onChange?: (value?: Array<CheckboxValue>) => void;
}
