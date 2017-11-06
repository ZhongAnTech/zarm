export default interface PropsType {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}
