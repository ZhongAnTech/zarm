export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'xl' | 'lg' | 'sm' | 'xs';
  shape?: 'radius' | 'round' | 'circle';
  block?: boolean;
  bordered?: boolean;
  active?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: JSX.Element;
  onClick?: (e?: any) => void;
}
