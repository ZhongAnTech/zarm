import { ReactNode } from 'react';

export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
  hasArrow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
}
