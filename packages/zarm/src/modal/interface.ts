import * as React from 'react';
import type { PopupProps } from '../popup';

export interface BaseModalProps extends PopupProps {
  shape?: 'radius' | 'rect';
  closable?: boolean;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  maskClosable?: boolean;
  onClose?: () => void;
}

export interface BaseModalActionProps {
  key?: string | number;
  text?: React.ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  bold?: boolean;
  onClick?: () => void;
}
