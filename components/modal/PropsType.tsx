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
  onMaskClick?: () => void;
  getContainer?: HTMLElement | getContainerFunc;
}

export interface BaseModalHeaderProps {
  title?: ReactNode;
  onClose?: () => void;
}

export interface BaseModalBodyProps {
  height?: string | number;
}

export interface BaseModalFooterProps {
  block?: boolean;
}
