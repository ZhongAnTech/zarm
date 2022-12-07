import { ReactNode } from 'react';
import type { ModalProps } from '../modal';

export interface BaseConfirmProps extends ModalProps {
  content?: ReactNode;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  onConfirm?: () => void | Promise<boolean | void>;
  onCancel?: () => void | Promise<boolean | void>;
}
