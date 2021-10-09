import type { ButtonSize, ButtonShape } from '../button/interface';

export type CheckboxType = 'button' | 'list';
export type CheckboxValue = number | string;

export interface BaseCheckboxProps {
  type?: CheckboxType;
  disabled?: boolean;
  value?: CheckboxValue;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  id?: string;
  buttonSize?: ButtonSize;
  buttonShape?: ButtonShape;
}

export interface BaseCheckboxGroupProps {
  type?: CheckboxType;
  disabled?: boolean;
  block?: boolean;
  value?: Array<CheckboxValue>;
  defaultValue?: Array<CheckboxValue>;
  buttonSize?: ButtonSize;
  buttonShape?: ButtonShape;
  buttonCompact?: boolean;
  buttonGhost?: boolean;
  onChange?: (value: Array<CheckboxValue>) => void;
}
