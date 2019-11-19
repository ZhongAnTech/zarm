import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'default' | 'primary' | 'danger';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  shape?: 'radius' | 'rect' | 'round' | 'circle';
  block?: boolean;
  ghost?: boolean;
  shadow?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}
