export interface BaseCheckboxProps {
  shape?: 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked?: boolean) => void;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: number | string;
}

export interface BaseCheckboxGroupProps {
  shape?: 'rect' | 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (value?: number[] | string[]) => void;
  value?: number[] | string[];
  defaultValue?: number[] | string[];
}
