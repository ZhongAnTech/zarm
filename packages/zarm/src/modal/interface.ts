import { ReactNode } from 'react';
import { ContainerType } from '../utils/dom';
import { MaskProps } from '../mask';

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
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
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
