export interface BaseCheckboxProps {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
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
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (value: Array<number | string>) => void;
  value?: Array<number | string>;
  defaultValue?: Array<number | string>;
  compact?: boolean;
}
