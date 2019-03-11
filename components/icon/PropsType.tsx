export default interface PropsType {
  type?: string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  onClick?: (e: any) => void;
}
