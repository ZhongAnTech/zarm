import { ReactNode } from 'react';
import type { ContainerType } from '../utils/dom';

export interface BaseAlertProps {
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
  cancelText?: string;
  destroy?: boolean;
  onCancel?: () => void | Promise<boolean | void>;
  afterClose?: () => void;
  mountContainer?: ContainerType | false;
}
