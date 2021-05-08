import type { Locale } from '../config-provider/PropsType';

export default interface PropsType {
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key?: string) => void;
  locale?: Locale['Keyboard'];
}
