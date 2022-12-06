import type { Locale } from '../config-provider/interface';

export default interface BaseSearchBarProps {
  shape?: 'rect' | 'radius' | 'round';
  cancelText?: string;
  showCancel?: boolean;
  clearable?: boolean;
  onCancel?: () => void;
  onSubmit?: (value: string) => void;
  locale?: Locale['SearchBar'];
}
