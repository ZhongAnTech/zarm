import { ReactNode } from 'react';

  export interface BaseCellProps {
  disabled?: boolean;
  hasArrow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
}
