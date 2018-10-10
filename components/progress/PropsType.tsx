import { CSSProperties } from 'react';

export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  percent?: number;
  type?: 'line' | 'circle' | 'semi-circle';
  shape?: 'round' | 'rect';
  weight?: 'normal' | 'thin';
  style?: CSSProperties;
}
