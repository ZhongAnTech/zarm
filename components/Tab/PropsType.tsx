interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  lineWidth?: string | number;
  disabled?: boolean;
  canSwipe?: boolean;
  onChange?: (index: number) => void;
  children?: any;
}

export interface TabProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

export interface TabPannelProps {
  prefixCls?: string;
  className?: string;
}
