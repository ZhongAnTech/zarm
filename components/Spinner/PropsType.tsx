interface IBase {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg';
  strokeWidth?: number;
  percent?: number;
}

export interface ISpinner extends IBase {
  prefixCls?: string;
  className?: string;
}
