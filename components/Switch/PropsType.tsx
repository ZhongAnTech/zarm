interface BaseProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export interface SwitchProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}

