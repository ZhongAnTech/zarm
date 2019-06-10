export default interface PropsType {
  visible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  autoClose?: boolean;
  stayTime?: number;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  onOpen?: () => void;
  onClose?: () => void;
  mask?: boolean;
  width?: string | number;
  maskType?: 'transparent' | 'normal';
  onMaskClick?: () => void;
}
