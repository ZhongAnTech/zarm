import * as React from 'react';
import type { MaskProps } from '../mask';
import type { BaseTransitionProps } from '../transition/interface';
import type { MountContainer } from '../utils/dom';

export interface BasePopupProps extends BaseTransitionProps {
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
  maskClassNname?: string;
  maskStyle?: React.CSSProperties;
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
  onOpen?: () => void;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
  onEsc?: () => void;
  mountContainer?: MountContainer;
  lockScroll?: boolean;
  children?: React.ReactNode;
}
