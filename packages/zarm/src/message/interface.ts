import { ReactNode } from 'react';

export type MessageTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type MessageSize = 'md' | 'lg';

export interface BaseMessageProps {
  theme?: MessageTheme;
  icon?: ReactNode;
  closable?: boolean;
  hasArrow?: boolean;
  size?: MessageSize;
}
