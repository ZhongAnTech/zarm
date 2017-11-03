export type Action = {
  text: string,
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error',
  className?: string,
  onClick?: () => void,
};

interface BaseProps {
  visible?: boolean;
  shape?: 'radius';
  actions: Action[];
  cancelText?: string;
  onMaskClick?: () => void;
  onCancel?: () => void;
}

export interface ActionSheetProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
