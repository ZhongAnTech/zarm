interface BaseProps {
  type?: string;
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'; 
  onClick?: () => void; 
}

export interface IconProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}