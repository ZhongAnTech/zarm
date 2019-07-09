import { MouseEvent, CSSProperties } from 'react';

export default interface PropsType {
  prefixcls?: string;
  type?: string;
  component?: React.ComponentType<SvgComponentProps>;
  theme?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface CustomIconOptions {
  scriptUrl: string;
}


export interface SvgComponentProps {
  width: string | number;
  height: string | number;
  fill: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
}
