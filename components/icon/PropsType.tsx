export default interface PropsType {
  type?: string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onClick?: (e: any) => void;
}
