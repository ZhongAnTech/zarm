export default interface PropsType {
  placeholder?: string;
  title?: any;
  cancelText?: string;
  okText?: string;
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: string | object;
  defaultValue?: string | object;
  wheelDefaultValue?: string | object;
  onCancel?: () => void;
  onMaskClick?: () => void;
  onClick: () => void;
  onChange?: (value?: Date) => void;
  minuteStep?: number;
  prefixCls?: string;
  min?: Date | string;
  max?: Date | string;
  formatYear?: (num?: number) => string;
  formatMonth?: (num?: number) => string;
  formatDay?: (num?: number) => string;
  formatHour?: (num?: number) => string;
  formatMinute?: (num?: number) => string;
  locale: any;
  valueMember?: string;
}
