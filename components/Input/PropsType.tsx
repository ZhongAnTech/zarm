export interface BaseInputProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  focused?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}

export interface BaseInputTextProps extends BaseInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value?: string) => void;
  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
}

export interface BaseInputNumberProps extends BaseInputProps {
  type?: 'number' | 'price' | 'idcard';
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value?: string | number) => void;
  onFocus?: (value?: string | number) => void;
  onBlur?: (value?: string | number) => void;
}

export interface BaseInputTextareaProps extends BaseInputProps {
  value?: string;
  defaultValue?: string;
  rows?: number;
  autoHeight?: boolean;
  showLength?: boolean;
  onChange?: (value?: string) => void;
  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
}
