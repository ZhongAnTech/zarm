export default interface BaseNavbarProps {
  showRight?: boolean;
  leftText?: string;
  rightText?: string;
  onClickLeft?: () => void;
  onClickRight?: () => void;
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
}
