export interface BaseLoadingProps {
  size?: 'lg';
  strokeWidth?: number;
  percent?: number;
  type?: 'circular' | 'spinner';
  loading?: boolean;
}

export interface LoadingCssVars {
  '--size'?: React.CSSProperties['width' | 'height'];
  '--size-large'?: React.CSSProperties['width' | 'height'];
  '--stroke-color'?: React.CSSProperties['stroke'];
  '--stroke-active-color'?: React.CSSProperties['stroke'];
  '--spinner-item-color'?: React.CSSProperties['color'];
  '--spinner-item-width'?: React.CSSProperties['width'];
  '--spinner-item-height'?: React.CSSProperties['height'];
  '--spinner-item-border-radius'?: React.CSSProperties['borderRadius'];
}