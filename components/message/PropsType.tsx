import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'default' |'primary' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  closable?: boolean;
  hasArrow?: boolean;
  size?: 'md' | 'lg';
}
