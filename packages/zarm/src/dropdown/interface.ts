import { ReactNode } from 'react';
import { TransitionName } from '../transition/interface';

export interface BaseDropdownProps {
  activeKey?: number | string;
  defaultActiveKey?: number | string;
  direction?: 'up' | 'down';
  disabled?: boolean;
  arrow?: ReactNode;
  children?: ReactNode;
  forceRender?: boolean;
  maskClosable?: boolean;
  maskOpacity?: number;
  animationType?: TransitionName;
  animationDuration?: number;
  destroy?: boolean;
  popupClassName?: string;
  zIndex?: number;
  onChange?: (activeKey: number | string) => void;
}

export type DropdownItemKey = string | number;
export interface BaseDropdownItemProps {
  title?: string;
  key: DropdownItemKey;
  arrow?: ReactNode;
  children?: ReactNode;
}

export interface DropdownCssVars {
  '--height': React.CSSProperties['height'];
  '--disabled-text-color': React.CSSProperties['color'];
  '--bar-title-padding': React.CSSProperties['padding'];
}
