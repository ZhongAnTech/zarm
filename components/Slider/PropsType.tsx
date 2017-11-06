export default interface PropsType {
  value?: number;
  defaultValue?: number;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}
