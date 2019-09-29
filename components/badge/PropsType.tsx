

export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  shape?: 'dot' | 'radius' | 'round' |'rect'| 'circle' | 'leaf';
  text?: React.ReactNode;
  style?: React.CSSProperties;
}
