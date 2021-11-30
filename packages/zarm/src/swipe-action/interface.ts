export interface BaseSwipeActionProps {
  left?: object[];
  right?: object[];
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  animationDuration?: number;
  offset?: number;
  autoClose?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
