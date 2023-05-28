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


export interface DropdownCssVars {
  '--height': React.CSSProperties['height'];
  '--disabled-text-color': React.CSSProperties['color'];
  '--bar-title-padding': React.CSSProperties['padding'];
}
