interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg';
  strokeWidth?: number;
  percent?: number;
}

export interface SpinnerProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
