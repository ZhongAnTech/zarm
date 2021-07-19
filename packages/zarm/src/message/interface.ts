import type { ReactNode, MouseEvent } from 'react';

export type MessageTheme = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface BaseMessageProps {
  theme?: MessageTheme;
  icon?: ReactNode;
  closable?: boolean;
  hasArrow?: boolean;
  onClose?: (e: MouseEvent<HTMLElement>) => void;
}
