import { ReactNode } from 'react';
export default interface PropsType {
  hasArrow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
  onClick?: () => void;
}
