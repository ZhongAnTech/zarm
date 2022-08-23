import React from 'react';
import { MountContainer } from '../utils/dom';

export type PopperPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-top'
  | 'left-bottom'
  | 'right-top'
  | 'right-bottom';

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
