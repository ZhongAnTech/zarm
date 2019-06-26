import { MouseEvent } from 'react';

export type theme = 'default' | 'primary' | 'success' | 'warning' | 'danger';
export type size = number | 'xs' | 'sm' | 'lg' | 'xl';

export default interface PropsType {
  prefixcls?: string;
  type?: string;
  theme?: theme;
  size?: size;
  style?: object;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
