interface BaseProps {
  value?: number;
  defaultValue?: number;
  step: number;
  min: number;
  max: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export interface SliderProps extends BaseProps {
  prefixCls?: string;
  className?: string;
}
