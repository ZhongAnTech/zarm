export default interface PropsType {
  visible?: boolean;
  type?: 'transparent' | 'normal';
  onClose?: () => void;
  style?: React.CSSProperties;
}
