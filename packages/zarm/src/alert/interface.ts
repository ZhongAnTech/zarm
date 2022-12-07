import { ReactNode } from 'react';
import type { ModalProps } from '../modal';

export interface BaseAlertProps extends ModalProps {
  content?: ReactNode;
  confirmText?: ReactNode;
  onConfirm?: () => void | Promise<boolean | void>;
}
