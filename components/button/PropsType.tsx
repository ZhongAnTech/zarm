export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'xl' | 'lg' | 'sm' | 'xs';
  shape?: 'radius' | 'round' | 'circle';
  block?: boolean;
  ghost?: boolean;
  active?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  // resolved?: boolean;
  icon?: JSX.Element;
  onClick?: (e?: any) => void;
}
