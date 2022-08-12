import { ReactNode } from 'react';
import type { ModalProps } from '../modal';

export interface BaseConfirmProps extends ModalProps {
  content?: ReactNode;
  okText?: ReactNode;
  cancelText?: ReactNode;
  onOk?: () => void | Promise<boolean | void>;
  onCancel?: () => void | Promise<boolean | void>;
}
