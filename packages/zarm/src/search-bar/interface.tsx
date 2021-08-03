import type { Locale } from '../config-provider/PropsType';

export default interface BaseSearchBarProps {
  disabled?: boolean;
  defaultValue?: string;
  shape?: 'rect' | 'radius' | 'round';
  cancelText?: string;
  placeholder?: string;
  showCancel?: boolean;
  clearable?: boolean;
  maxLength?: number;
  onSubmit?: (value?: string) => void;
  onCancel?: () => void;
  locale?: Locale['SearchBar'];
}
