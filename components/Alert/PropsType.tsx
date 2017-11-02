interface BaseProps {
  shape?: 'radius';
  visible?: boolean;
  animationType?: 'fade' | 'door' | 'flip' | 'rotate' | 'zoom' | 'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  onMaskClick?: () => void;
  title?: any;
  message?: any;
  cancelText?: any;
  onCancel?: () => void;
}

export interface AlertProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}