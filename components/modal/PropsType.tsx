import { ReactNode } from 'react';

type getContainerFunc = () => HTMLElement;

export interface BaseModalProps {
  shape?: 'radius' | 'rect';
  visible?: boolean;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  afterClose?: () => void;
  maskClosable?: boolean;
  closable?: boolean;
  getContainer?: HTMLElement | getContainerFunc;
  title?: ReactNode;
  footer?: ReactNode;
  onCancel?: () => void;
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
