interface BaseCheckboxProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  size?: 'lg';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: number | string;
}

export interface CheckboxProps extends BaseCheckboxProps {
  prefixCls?: string;
  className?: string;
}


interface BaseCheckboxGroupProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  size?: 'lg';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked: boolean) => void;
  value?: Array<number | string>;
  defaultValue?: Array<number | string>;
  compact?: boolean;
}

export interface CheckboxGroupProps extends BaseCheckboxGroupProps {
  prefixCls?: string;
  className?: string;
}