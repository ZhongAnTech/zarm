import React from 'react';

export interface BaseInputProps {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  focused?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
}

export interface InputBaseProps extends BaseInputProps {
  type?: 'text' | 'search' | 'password' | string;
  value?: string;
  defaultValue?: string;
  clearable?: boolean;
  onChange?: (value?: string) => void;
  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
  onClear?: (value?: string) => void;
  onCompositionStart?: (e: any) => void;
  onCompositionUpdate?: (e: any) => void;
  onCompositionEnd?: (e: any) => void;
}

export interface InputNumberProps extends BaseInputProps {
  type?: 'number' | 'price' | 'idcard';
  value?: string | number;
  defaultValue?: string | number;
  clearable?: boolean;
  onChange?: (value?: string | number) => void;
  onFocus?: (value?: string | number) => void;
  onBlur?: (value?: string | number) => void;
  onClear?: (value?: string) => void;
}

export interface InputTextareaProps extends BaseInputProps {
  type?: 'text';
  value?: string;
  defaultValue?: string;
  rows?: number;
  autoHeight?: boolean;
  showLength?: boolean;
  onChange?: (value?: string) => void;
  onFocus?: (value?: string) => void;
  onBlur?: (value?: string) => void;
  onCompositionStart?: (e: any) => void;
  onCompositionUpdate?: (e: any) => void;
  onCompositionEnd?: (e: any) => void;
}
