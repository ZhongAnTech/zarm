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
  mountContainer?: ContainerType | false;
  title?: ReactNode;
  footer?: ReactNode;
  destroy?: boolean;
  afterOpen?: () => void;
  onCancel?: () => void;
  afterClose?: () => void;
}

export interface BaseModalHeaderProps {
  title?: ReactNode;
  closable?: boolean;
  onCancel?: () => void;
}

// export interface BaseModalBodyProps {
//   height?: string | number;
// }

// export interface BaseModalFooterProps {
//   block?: boolean;
// }
