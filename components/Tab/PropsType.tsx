export default interface PropsType {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  lineWidth?: string | number;
  disabled?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
}
