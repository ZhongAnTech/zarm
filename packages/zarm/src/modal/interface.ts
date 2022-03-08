import { ReactNode } from 'react';
import { ContainerType } from '../utils/dom';

export interface BaseModalProps {
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
  mask?: boolean;
  maskType?: 'transparent' | 'normal';
  maskClosable?: boolean;
  closable?: boolean;
  mountContainer?: ContainerType;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  destroy?: boolean;
  afterOpen?: () => void;
  onClose?: () => void;
  afterClose?: () => void;
}

export interface BaseModalActionProps {
  key?: string | number;
  text?: ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  bold?: boolean;
  onClick?: () => void;
}
