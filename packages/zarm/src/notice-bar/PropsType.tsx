import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: ReactNode;
  closable?: boolean;
  hasArrow?: boolean;
  speed?: number;
  delay?: number;
}
