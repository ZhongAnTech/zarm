import type { ContainerType } from '../utils/dom';
import type { MaskProps } from '../mask';

export interface BasePopupProps {
  visible?: boolean;
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  animationType?:
    | 'fade'
    | 'door'
    | 'flip'
    | 'rotate'
    | 'zoom'
    | 'moveUp'
    | 'moveDown'
    | 'moveLeft'
    | 'moveRight'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  mask?: boolean;
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
  destroy?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  onEsc?: () => void;
  mountContainer?: ContainerType | false;
  lockScroll?: boolean;
  children?: React.ReactNode;
}
