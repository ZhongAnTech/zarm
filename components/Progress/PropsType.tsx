interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  strokeWidth?: number;
  percent?: number;
  shape?: 'line' | 'circle';
}

export interface ProgressProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
