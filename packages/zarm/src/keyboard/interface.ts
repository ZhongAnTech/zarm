import type { Locale } from '../config-provider/PropsType';

export interface BaseKeyBoardProps {
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key?: string) => void;
  locale?: Locale['Keyboard'];
}
