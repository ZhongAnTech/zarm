import { ReactNode } from 'react';

export interface BaseInputTextProps {
  label?: ReactNode;
  clearable?: boolean;
}

export interface BaseInputTextareaProps {
  label?: ReactNode;
  clearable?: boolean;
  autoHeight?: boolean;
  showLength?: boolean;
}
