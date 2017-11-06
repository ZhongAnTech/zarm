export default interface PropsType {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg';
  icon?: any;
  hasArrow?: boolean;
  hasClosable?: boolean;
  onClick?: () => void;
}
