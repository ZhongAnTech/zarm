

export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  shape?: 'dot' | 'radius' | 'round' |'rect'| 'circle' | 'leaf';
  sup?: boolean;
  text?: React.ReactNode;
  style?: React.CSSProperties;
}
