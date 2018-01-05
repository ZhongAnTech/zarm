export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'lg';
  icon?: any;
  hasArrow?: boolean;
  hasClosable?: boolean;
  onClick?: () => void;
}
