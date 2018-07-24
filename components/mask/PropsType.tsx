export default interface PropsType {
  visible?: boolean;
  type?: 'transparent' | 'normal';
  onClick?: () => void;
  style?: React.CSSProperties;
}
