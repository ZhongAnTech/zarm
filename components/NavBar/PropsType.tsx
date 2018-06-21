export default interface PropsType {
  showRight?: boolean;
  leftText?: string;
  rightText?: string;
  onClickLeft: () => void;
  onClickRight?: () => void;
}
