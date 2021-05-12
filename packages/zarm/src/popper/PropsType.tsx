import React from 'react';
import { ContainerType } from '../utils/dom';

export type PopperPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type PopperTrigger = 'hover' | 'focus' | 'click' | 'manual' | 'contextMenu';

export default interface BasePopperProps {
  visible?: boolean;
  hasArrow?: boolean;
  arrowPointAtCenter?: boolean;
  direction?: PopperPlacement;
  trigger?: PopperTrigger;
  animationType?: string;
  animationDuration?: number;
  // popperOptions?: PopperJS.PopperOptions;
  // modifiers?: PopperJS.Modifiers;
  content?: React.ReactNode;
  destroy?: boolean;
  mountContainer?: ContainerType;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
}

export const directionMap = {
  top: 'top' as const,
  topLeft: 'top-start' as const,
  topRight: 'top-end' as const,
  right: 'right' as const,
  rightTop: 'right-start' as const,
  rightBottom: 'right-end' as const,
  bottom: 'bottom' as const,
  bottomLeft: 'bottom-start' as const,
  bottomRight: 'bottom-end' as const,
  left: 'left' as const,
  leftTop: 'left-start' as const,
  leftBottom: 'left-end' as const,
};
