import type { Locale } from '../n-config-provider/interface';

export interface BaseKeyBoardProps {
  type?: 'number' | 'price' | 'idcard';
  onKeyClick?: (key: string) => void;
  locale?: Locale['Keyboard'];
}
