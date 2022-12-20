import * as React from 'react';
import type { MaskProps } from '../mask';
import type { MountContainer } from '../utils/dom';

export interface BaseToastProps {
  visible?: boolean;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  mask?: boolean;
  maskClassName?: string;
  maskStyle?: React.CSSProperties;
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
  maskClickable?: boolean;
  duration?: number;
  mountContainer?: MountContainer;
  onOpen?: () => void;
  onClose?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  onMaskClick?: () => void;
}
