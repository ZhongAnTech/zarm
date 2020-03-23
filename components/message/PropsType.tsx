import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'default' |'primary' | 'success' | 'warning' | 'danger';
  icon?: ReactNode;
  closable?: boolean;
  hasArrow?: boolean;
  size?: 'md' | 'lg';
}
