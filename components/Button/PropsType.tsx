export default interface PropsType {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xl' | 'lg' | 'sm' | 'xs';
  shape?: 'radius' | 'round' | 'circle';
  block?: boolean;
  bordered?: boolean;
  active?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  onClick?: (x?: any) => void;
}

