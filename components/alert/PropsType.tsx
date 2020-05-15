import { ReactNode } from 'react';
import { Locale } from '../locale-provider/PropsType';
import { ContainerType } from '../popup/PropsType';

export default interface PropsType {
  shape?: 'rect';
  visible?: boolean;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  title?: ReactNode;
  content?: ReactNode;
  mask: boolean;
  maskType?: 'transparent' | 'normal';
  maskClosable?: boolean;
  cancelText?: string;
  destroy: boolean;
  onCancel?: () => void;
  afterClose?: () => void;
  locale?: Locale['Alert'];
  getContainer?: ContainerType;
}
