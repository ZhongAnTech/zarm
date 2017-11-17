export default interface PropsType {
  placeholder?: string;
  title?: any;
  cancelText?: string;
  okText?: string;
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: string | object;
  defaultValue?: string | object;
  onOk?: (date?: string | object) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  onClick: () => void;
  minuteStep?: number;
  prefixCls?: string;
  min?: object | string;
  max?: object | string;
  formatMonth: (num?: number, date?: string | object) => void;
  formatDay: (num?: number, date?: string | object) => void;
  locale: any;
  valueMember?: string;
}
