interface IBase {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  strokeWidth?: number;
  percent?: number;
  shape?: 'line' | 'circle';
}

export interface IProgress extends IBase {
  prefixCls?: string;
  className?: string;
}
