interface IBase {
  visible?: boolean;
  type?: 'transparent' | 'light' | 'normal' | 'dark';
  onClose?: (x?: any) => void;
}

export interface IMask extends IBase {
  prefixCls?: string;
  className?: string;
}
