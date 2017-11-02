interface BaseProps {
  shape?: 'radius';
  visible?: boolean;
  animationType?: 'fade' | 'door' | 'flip' | 'rotate' | 'zoom' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  onMaskClick?: () => void; 
}

export interface ModalProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

interface ModalHeaderBaseProps extends BaseProps {
  title?: any;
  onClose?: () => void;
}

export interface ModalHeaderProps extends ModalHeaderBaseProps {
  prefixCls?: string;
  className?: string;
}

interface ModalBodyBaseProps extends BaseProps {
  height?: string | number;
}

export interface ModalBodyProps extends ModalBodyBaseProps {
  prefixCls?: string;
  className?: string;
}

export interface ModalFooterProps {
  prefixCls?: string;
  className?: string;
}