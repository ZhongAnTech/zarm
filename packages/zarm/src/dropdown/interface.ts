import { ReactNode } from 'react';
import { TransitionName } from '../transition/interface';

export interface BaseDropdownProps {
  activeKey?: number | string;
  defaultActiveKey?: number | string;
  direction?: 'top' | 'bottom';
  disabled?: boolean;
  arrow?: ReactNode;
  children?: ReactNode;
  forceRender?: boolean;
  maskClosable?: boolean;
  maskOpacity?: number;
  animationType?: TransitionName;
  destroy?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
  onChange?: (activeKey: number | string) => void;
}

export type DropdownItemKey = string | number;
export interface BaseDropdownItemProps {
  children?: ReactNode;
  mountContainer?: HTMLElement;
  title?: string;
  key: DropdownItemKey;
  visible?: boolean;
  offset?: number;
  direction?: 'top' | 'bottom';
}
