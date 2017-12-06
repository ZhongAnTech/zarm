export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'error';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}
