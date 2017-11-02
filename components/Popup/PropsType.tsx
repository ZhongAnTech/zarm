interface BaseProps {
  visible?: boolean;
  shape?: 'radius';
  direction?: 'top' | 'right' | 'bottom' | 'left';
  autoClose?: boolean;
  stayTime?: number;
  animationDuration?: number;
  onClose?: () => void;
  mask?: boolean;
  maskType?: 'transparent' | 'light' | 'normal' | 'dark';
  onMaskClick?: () => void;
}

export interface PopupProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}