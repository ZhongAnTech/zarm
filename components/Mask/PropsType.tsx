export default interface PropsType {
  visible?: boolean;
  type?: 'transparent' | 'light' | 'normal' | 'dark';
  onClose?: () => void;
  style?: React.CSSProperties;
}
