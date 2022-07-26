import { ReactNode } from 'react';
import type { GetContainer } from '../utils/dom';
import type { MaskProps } from '../mask';
import type { PopupProps } from '../popup';

export interface BaseModalProps extends Pick<PopupProps, 'animationType' | 'animationDuration'> {
  shape?: 'radius' | 'rect';
  visible?: boolean;
  width?: string | number;
  mask?: boolean;
  maskColor?: MaskProps['color'];
  maskOpacity?: MaskProps['opacity'];
  maskClosable?: boolean;
  closable?: boolean;
  mountContainer?: GetContainer;
  title?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  destroy?: boolean;
  afterOpen?: () => void;
  onClose?: () => void;
  afterClose?: () => void;
}

export interface BaseModalActionProps {
  key?: string | number;
  text?: ReactNode;
  theme?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  bold?: boolean;
  onClick?: () => void;
}
