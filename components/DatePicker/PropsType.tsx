export default interface PropsType {
  visible?: boolean;
  placeholder?: string;
  title?: any;
  cancelText?: string;
  okText?: string;
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: string | object;
  defaultValue?: string | object;
  wheelDefaultValue?: string | object;
  onValueChange?: (value?: Date) => void;
  onChange?: (value?: Date) => void;
  onOk?: (date?: string | object) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  onClick: () => void;
  minuteStep?: number;
  prefixCls?: string;
  min?: object | string;
  max?: object | string;
  formatYear?: (num?: number) => string;
  formatMonth?: (num?: number) => string;
  formatDay?: (num?: number) => string;
  formatHour?: (num?: number) => string;
  formatMinute?: (num?: number) => string;
  locale: any;
  valueMember?: string;
}
