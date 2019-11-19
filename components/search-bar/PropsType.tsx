import { Locale } from '../locale-provider/PropsType';

export default interface BaseSearchBarProps {
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  shape?: 'rect' | 'radius' | 'round';
  cancelText?: string;
  placeholder?: string;
  showCancel?: boolean;
  clearable?: boolean;
  maxLength?: number;
  onSubmit?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: (value?: string) => void;
  onCancel?: () => void;
  locale: Locale['SearchBar'];
}
