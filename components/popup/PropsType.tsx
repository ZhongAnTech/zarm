type getContainerFunc = () => HTMLElement;

export default interface PropsType {
  visible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  mask?: boolean;
  maskType?: 'transparent' | 'normal';
  destroy?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  getContainer?: HTMLElement | getContainerFunc;
}
