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

export interface PopperState {
  visible: boolean;
  direction: PopperPlacement;
  arrowRef: any;
}

export interface PopperProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  visible?: boolean;
  hasArrow?: boolean;
  direction?: PopperPlacement;
  trigger?: PopperTrigger;
  // popperOptions?: PopperJS.PopperOptions;
  // modifiers?: PopperJS.Modifiers;
  title?: React.ReactNode;
  content?: React.ReactNode;
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
