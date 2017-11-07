export interface BaseInputProps {
  type?: string;
  autosize?: boolean;
}

export interface BaseInputTextProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (x?: any) => void;
}

export interface BaseInputNumberProps {
  type?: 'number' | 'price' | 'idcard';
  value?: string | number;
  defaultValue?: string | number;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (x?: any) => void;
}

export interface BaseInputTextareaProps {
  type?: 'number' | 'price' | 'idcard';
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  rows?: number;
  autosize?: boolean;
  maxLength?: number;
  showLength?: boolean;
  style?: React.CSSProperties;
  onChange?: (x?: any) => void;
}
