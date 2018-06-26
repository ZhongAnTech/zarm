export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'circle';
  value?: number;
  defaultValue?: number;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  onInputChange?: (value: number) => void;
  onChange?: (value: number) => void;
}
