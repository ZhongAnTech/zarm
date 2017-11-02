interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'dot' | 'radius' | 'round' | 'circle';
  sup?: boolean;
  text?: any;
}

export interface BadgeProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

