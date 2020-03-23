import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'danger';
  icon?: ReactNode;
  scrollable?: boolean;
  closable?: boolean;
  hasArrow?: boolean;
}
