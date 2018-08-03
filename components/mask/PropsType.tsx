export default interface PropsType {
  visible?: boolean;
  type?: 'normal' | 'transparent';
  onClick?: () => void;
  style?: React.CSSProperties;
}
