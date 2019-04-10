export default interface PropsType {
  visible?: boolean;
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key?: string) => void;
}

// declare global {
//   interface Window {
//     zarmKeyboardPicker?: any;
//   }
// }
