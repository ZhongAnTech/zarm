export interface BaseSearchBarProps {
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  shape?: string;
  cancelText?: string;
  placeholder?: string;
  showCancel?: boolean;
  clearable?: boolean;
  onSubmit?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: (value?: string) => void;
  onCancel?: () => void;
}
