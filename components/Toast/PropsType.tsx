interface BaseProps {
  visible?: boolean;
  stayTime?: number;
  onMaskClick?: (x?: any) => void;
}

export interface ToastProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
