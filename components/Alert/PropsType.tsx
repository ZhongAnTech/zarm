export default interface PropsType {
  shape?: 'radius';
  visible?: boolean;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  onMaskClick?: () => void;
  title?: any;
  message?: any;
  cancelText?: any;
  onCancel?: () => void;
}

declare global {
  interface Window {
    zarmAlert?: any;
  }
}
