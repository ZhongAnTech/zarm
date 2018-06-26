export default interface PropsType {
  left?: Array<Object>;
  right?: Array<Object>;
  moveDistanceRatio: number;
  moveTimeSpan: number;
  animationDuration?: number;
  offset: number;
  autoClose?: boolean;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
