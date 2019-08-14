export type CheckboxType = 'normal' | 'button' | 'cell';
export type CheckboxShape = 'rect' | 'radius' | 'round';
export type CheckboxValue = number | string;

export interface BaseCheckboxProps {
  shape?: CheckboxShape;
  type?: CheckboxType;
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked?: boolean) => void;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: CheckboxValue;
}

export interface BaseCheckboxGroupProps {
  shape?: CheckboxShape;
  type?: CheckboxType;
  disabled?: boolean;
  block?: boolean;
  value?: Array<CheckboxValue>;
  defaultValue?: Array<CheckboxValue>;
  onChange?: (value?: Array<CheckboxValue>) => void;
}
