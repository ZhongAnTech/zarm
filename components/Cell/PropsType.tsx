interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  hasArrow?: boolean;
  icon?: any;
  title?: any;
  description?: any;
  help?: any;
  disabled?: boolean;
  onClick?: () => void;
}

export interface CellProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
