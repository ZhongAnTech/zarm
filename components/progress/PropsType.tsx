import { CSSProperties } from 'react';

export type ProgressWeight = 'bold' | 'normal' | 'thin';

export type ProgressSize = 'lg' | 'md' | 'sm';

export default interface PropsType {
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  percent?: number;
  type?: 'line' | 'circle' | 'semi-circle';
  shape?: 'round' | 'rect';
  size?: ProgressSize;
  weight?: ProgressWeight;
  style?: CSSProperties;
}
