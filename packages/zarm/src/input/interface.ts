import { ReactNode } from 'react';

export interface BaseInputTextProps {
  label?: ReactNode;
  clearable?: boolean;
}

export interface BaseInputTextareaProps {
  label?: ReactNode;
  clearable?: boolean;
  autoHeight?: boolean;
  showLength?: boolean;
}

export interface InputCssVars {
  '--height'?: React.CSSProperties['height'];
  '--line-height': React.CSSProperties['lineHeight'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
  '--background'?: React.CSSProperties['background'];
  '--label-font-size'?: React.CSSProperties['fontSize'];
  '--placeholder-color'?: React.CSSProperties['color'];
  '--disabled-color'?: React.CSSProperties['color'];
  '--clear-icon-size'?: React.CSSProperties['width'];
  '--clear-icon-color'?: React.CSSProperties['color'];
  '--textarea-length-font-size'?: React.CSSProperties['fontSize'];
  '--textarea-length-color'?: React.CSSProperties['color'];
}
