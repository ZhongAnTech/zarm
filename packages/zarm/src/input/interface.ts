import { ReactNode } from 'react';
 
export interface BaseInputTextProps {
  label?: ReactNode;
  vertical?: boolean;
  clearable?: boolean;
}

export interface BaseInputTextareaProps {
  label?: ReactNode;
  vertical?: boolean;
  clearable?: boolean;
  autoHeight?: boolean;
  showLength?: boolean;
}
