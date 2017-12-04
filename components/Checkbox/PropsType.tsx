export interface BaseCheckboxProps {
  shape?: 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: number | string;
}

export interface BaseCheckboxGroupProps {
  shape?: 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (value: Array<number | string>) => void;
  value?: Array<number | string>;
  defaultValue?: Array<number | string>;
  compact?: boolean;
}
