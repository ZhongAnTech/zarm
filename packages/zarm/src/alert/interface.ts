import { ReactNode } from 'react';
import type { ModalProps } from '../modal';

export interface BaseAlertProps extends ModalProps {
  content?: ReactNode;
  cancelText?: ReactNode;
  onCancel?: () => void | Promise<boolean | void>;
}
