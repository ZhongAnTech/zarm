export default interface PropsType {
  visible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  afterOpen?: () => void;
  afterClose?: () => void;
  mask?: boolean;
  width?: string | number;
  maskType?: 'transparent' | 'normal';
  onMaskClick?: () => void;
}
