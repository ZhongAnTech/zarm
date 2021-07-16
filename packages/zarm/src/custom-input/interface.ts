export type CustomInputType = 'number' | 'price' | 'idcard';

export interface BaseCustomInputProps {
  type?: CustomInputType;
  clearable?: boolean;
  onChange?: (value: string) => void;
  onFocus?: (value: string) => void;
  onBlur?: (value: string) => void;
}
