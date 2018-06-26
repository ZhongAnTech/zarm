export default interface PropsType {
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key: string) => void;
}
