import { ReactNode } from 'react';

  export default interface BaseCellProps {
  disabled?: boolean;
  hasArrow?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
}
