interface BaseProps {
  visible?: boolean;
  type?: 'transparent' | 'light' | 'normal' | 'dark';
  onClose?: () => void;
  style?: React.CSSProperties;
}

export interface MaskProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
