export default interface PropsType<T = any> {
  theme?: 'default' |'primary' | 'success' | 'warning' | 'error';
  icon?: any;
  scrollable?: boolean;
  closable?: boolean;
  hasArrow?: boolean;
  onClick?: (event: T) => void;
  size?: 'lg';
}
