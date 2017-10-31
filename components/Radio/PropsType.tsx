interface BaseRadioProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  size?: 'lg';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: number | string;
}

export interface RadioProps extends BaseRadioProps {
  prefixCls?: string;
  className?: string;
}

interface BaseRadioGroupProps {
  theme?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'radius' | 'round';
  size?: 'lg';
  type?: 'button' | 'cell';
  disabled?: boolean;
  block?: boolean;
  onChange?: (checked: boolean) => void;
  value?: number | string;
  defaultValue?: number | string;
  compact?: boolean;
}

export interface RadioGroupProps extends BaseRadioGroupProps {
  prefixCls?: string;
  className?: string;
}