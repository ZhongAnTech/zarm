export default interface PropsType {
  type?: string;
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  onClick?: () => void;
}
