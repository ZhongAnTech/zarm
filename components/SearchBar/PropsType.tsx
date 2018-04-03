export interface BaseSearchbarProps {
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  shape?: string;
  cancelText?: string;
  placeholder?: string;
  onSubmit?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onInput?: (value?: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  onCancel?: () => void;
}
