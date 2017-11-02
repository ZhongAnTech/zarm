interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  size?: 'lg';
  icon?: any;
  hasArrow?: boolean;
  hasClosable?: boolean;
  onClick?: () => void; 
}

export interface MessageProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}