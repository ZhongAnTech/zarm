export interface BaseCustomInputProps {
  type?: 'number' | 'price' | 'idcard';
  clearable?: boolean;
  onChange?: (value?: string) => void;
  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
}
