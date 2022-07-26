import type { MountContainer } from '../utils/dom';
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
    | 'move-up'
    | 'move-down'
    | 'move-left'
    | 'move-right'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right';
  animationDuration?: number;
  width?: string | number;
  mask?: boolean;
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
  destroy?: boolean;
  forceRender?: boolean;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  onEsc?: () => void;
  mountContainer?: MountContainer;
  lockScroll?: boolean;
  children?: React.ReactNode;
}
