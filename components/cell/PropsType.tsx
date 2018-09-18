import { ReactNode } from 'react';

export default interface PropsType {
  disabled?: boolean;
  hasArrow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
}
