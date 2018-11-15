export default interface PropsType {
  shape?: 'radius' | 'circle';
  value?: number;
  defaultValue?: number;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  onInputChange?: (value?: number) => void;
  onChange?: (value?: number) => void;
}
