export default interface PropsType {
  size?: 'md' | 'lg';
  shape?: 'rect' | 'radius' | 'circle';
  value?: number;
  defaultValue?: number;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  onInputChange?: (value?: number) => void;
  onChange?: (value?: number) => void;
}
