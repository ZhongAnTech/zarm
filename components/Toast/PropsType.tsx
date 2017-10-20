interface IBaseToast {
  visible?: boolean;
  stayTime?: number;
  onMaskClick?: (x?: any) => void;
}

export interface IToast extends IBaseToast {
  prefixCls?: string;
  className?: string;
}
