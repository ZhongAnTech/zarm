import * as React from 'react';

export interface BaseInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
}

export interface BaseInputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  clearable?: boolean;
  autoHeight?: boolean;
  showLength?: boolean;
}
