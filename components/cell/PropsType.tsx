import { ReactNode } from 'react';
export default interface PropsType {
  theme?: 'primary' | 'success' | 'warning' | 'error';
  hasArrow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
  disabled?: boolean;
  onClick?: (e?: any) => void;
}
