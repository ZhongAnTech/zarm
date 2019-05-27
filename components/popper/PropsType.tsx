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

export type PopperTrigger = 'hover' | 'focus' | 'click' | 'manual';

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
  top: 'top',
  topLeft: 'top-start',
  topRight: 'top-end',
  right: 'right',
  rightTop: 'right-start',
  rightBottom: 'right-end',
  bottom: 'bottom',
  bottomLeft: 'bottom-start',
  bottomRight: 'bottom-end',
  left: 'left',
  leftTop: 'left-start',
  leftBottom: 'left-end',
};
