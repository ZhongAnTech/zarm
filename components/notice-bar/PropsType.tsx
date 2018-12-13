import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'default' |'primary' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  scrollable?: boolean;
  closable?: boolean;
  hasArrow?: boolean;
}
