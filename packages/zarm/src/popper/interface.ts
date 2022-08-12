import React from 'react';
import { MountContainer } from '../utils/dom';

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
  mountContainer?: MountContainer;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
}
