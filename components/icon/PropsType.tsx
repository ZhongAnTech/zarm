export default interface BasePropsType {
  type?: string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  component?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  viewBox?: string;
}
