import { ReactNode } from 'react';
import { Locale } from '../locale-provider/PropsType';

type getContainerFunc = () => HTMLElement;

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
  okText?: string;
  onOk?: () => void;
  cancelText?: string;
  onCancel?: () => void;
  afterClose?: () => void;
  locale?: Locale['Confirm'];
  getContainer?: HTMLElement | getContainerFunc;
}
