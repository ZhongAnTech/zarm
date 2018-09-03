export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  shape?: 'dot' | 'rect' | 'radius' | 'round' | 'circle' | 'leaf';
  sup?: boolean;
  text?: string;
  style?: React.CSSProperties;
}
