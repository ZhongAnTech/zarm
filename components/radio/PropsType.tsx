export interface BaseRadioProps {
  shape?: 'rect' | 'radius' | 'round';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked?: boolean) => void;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: number | string;
}

export interface BaseRadioGroupProps {
  shape?: 'rect' | 'radius' | 'round';
  size?: 'lg';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (value?: string | number) => void;
  value?: number | string;
  defaultValue?: number | string;
}
