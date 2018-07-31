export default interface PropsType {
  visible?: boolean;
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key: string) => void;
  children?: any;
}

declare global {
  interface Window {
    zarmKeyboardPicker?: any;
  }
}
