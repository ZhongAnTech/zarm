export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'error';
  lineWidth?: string | number;
  disabled?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
}
