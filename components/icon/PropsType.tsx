import { MouseEvent, CSSProperties } from 'react';

export default interface PropsType {
  prefixcls?: string;
  type: string;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
