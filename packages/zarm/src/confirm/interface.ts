import { ReactNode } from 'react';
import type { ContainerType } from '../utils/dom';

export interface BaseConfirmProps {
  shape?: 'radius' | 'rect';
  visible?: boolean;
  animationType?:
    | 'fade'
    | 'door'
    | 'flip'
    | 'rotate'
    | 'zoom'
    | 'moveUp'
    | 'moveDown'
    | 'moveLeft'
    | 'moveRight'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  title?: ReactNode;
  content?: ReactNode;
  okText?: string;
  onOk?: () => void | Promise<boolean | void>;
  cancelText?: string;
  onCancel?: () => void | Promise<boolean | void>;
  afterClose?: () => void;
  mountContainer?: ContainerType | false;
}
