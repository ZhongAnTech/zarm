export interface BasePickerProps {
  placeholder?: string;
  title?: string;
  cancelText?: string;
  okText?: string;
  dataSource: object[];
  value?: string | string[];
  valueMember: string;
  disabled?: boolean;
  cols?: number;
  prefixCls?: string;
  onOk: (value?: object) => void;
  onClick: () => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  displayRender?: (data?: object) => string;
  itemRender: (data?: object) => string;
  onChange?: (value?: any) => any;
}
