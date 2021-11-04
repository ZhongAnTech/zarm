export interface BaseStepperProps {
  size?: 'md' | 'lg';
  shape?: 'rect' | 'radius' | 'circle';
  value?: number;
  defaultValue?: number;
  type?: 'text' | 'number' | 'price' | 'tel';
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  disableInput?: boolean;
  onInputChange?: (value: number | string) => void;
  onChange?: (value: number | string) => void;
}
