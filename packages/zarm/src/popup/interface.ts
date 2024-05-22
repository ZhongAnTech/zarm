import * as React from 'react';
import type { MaskProps } from '../mask';
import type { BaseTransitionProps, TransitionName } from '../transition/interface';
import type { MountContainer } from '../utils/dom';

export interface BasePopupProps extends BaseTransitionProps {
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  animationType?: TransitionName;
  animationDuration?: number;
  width?: string | number;
  mask?: boolean;
  maskClassName?: string;
  maskStyle?: React.CSSProperties;
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
  onOpen?: () => void;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: MaskProps['onClick'];
  onEsc?: () => void;
  mountContainer?: MountContainer;
  lockScroll?: boolean;
  children?: React.ReactNode;
}
