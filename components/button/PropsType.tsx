import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'default' | 'primary' | 'danger';
  size?: 'lg' | 'sm' | 'xs';
  shape?: 'radius' | 'rect' | 'round' | 'circle';
  block?: boolean;
  ghost?: boolean;
  focus?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}
