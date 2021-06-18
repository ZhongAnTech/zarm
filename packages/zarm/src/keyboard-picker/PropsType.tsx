export default interface PropsType {
  visible?: boolean;
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key?: string) => void;
  destroy?: boolean;
}
