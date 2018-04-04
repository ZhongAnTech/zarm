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
  onCompositionStart?: (e?: KeyboardEvent) => void;
  onCompositionUpdate?: (e?: KeyboardEvent) => void;
  onCompositionEnd?: (e?: KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  onCancel?: () => void;
}
