import type { ButtonSize, ButtonShape } from '../button/interface';

export type CheckboxType = 'button' | 'list';
export type CheckboxValue = number | string;
export type CheckboxGroupListMarkerAlign = 'before' | 'after';

export interface BaseCheckboxProps {
  type?: CheckboxType;
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: CheckboxValue;
  id?: string;
  listMarkerAlign?: CheckboxGroupListMarkerAlign;
  indeterminate?: boolean;
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
  listMarkerAlign?: CheckboxGroupListMarkerAlign;
  onChange?: (value: Array<CheckboxValue>) => void;
}
