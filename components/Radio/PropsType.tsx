export interface BaseRadioProps {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: number | string;
}

export interface BaseRadioGroupProps {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  size?: 'lg';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (value: string | number) => void;
  value?: number | string;
  defaultValue?: number | string;
  compact?: boolean;
}
