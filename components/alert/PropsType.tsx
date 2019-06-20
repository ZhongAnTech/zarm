import { ReactNode } from 'react';
import { Locale } from '../locale-provider/PropsType';

export default interface PropsType {
  shape?: 'radius';
  visible?: boolean;
  animationType?:
    'fade' | 'door' | 'flip' | 'rotate' | 'zoom' |
    'moveUp' | 'moveDown' | 'moveLeft' | 'moveRight' |
    'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  animationDuration?: number;
  width?: string | number;
  onMaskClick?: () => void;
  title?: ReactNode;
  message?: ReactNode;
  cancelText?: string;
  onCancel?: () => void;
  locale?: Locale['Alert'];
}

declare global {
  interface Window {
    zarmAlert?: any;
  }
}
