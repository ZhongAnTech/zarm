import { ReactNode } from 'react';

export interface BaseModalProps {
  shape?: 'rect';
  visible?: boolean;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  afterClose?: () => void;
  onMaskClick?: () => void;
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
