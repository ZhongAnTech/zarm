export interface BaseModalProps {
  shape?: 'radius';
  visible?: boolean;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  onMaskClick?: () => void;
}

export interface BaseModalHeaderProps {
  title?: any;
  onClose?: () => void;
}

export interface BaseModalBodyProps {
  height?: string | number;
}

export interface BaseModalFooterProps {
  block?: boolean;
}
