import { ReactNode } from 'react';
import type { PopupProps } from '../popup';

export interface BaseModalProps extends PopupProps {
  shape?: 'radius' | 'rect';
  closable?: boolean;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  maskClosable?: boolean;
  onClose?: () => void;
}

export interface BaseModalActionProps {
  key?: string | number;
  text?: ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  bold?: boolean;
  onClick?: () => void;
}
