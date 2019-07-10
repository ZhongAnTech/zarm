
interface BasicPropsType {
  prefixcls?: string;
  type?: string;
  component?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  viewBox?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type IconPropsType = BasicPropsType & React.HTMLAttributes<HTMLElement>;
