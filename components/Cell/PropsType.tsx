export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  hasArrow?: boolean;
  icon?: any;
  title?: any;
  description?: any;
  help?: any;
  disabled?: boolean;
  onClick?: () => void;
}
