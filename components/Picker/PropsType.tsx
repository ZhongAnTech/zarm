
export interface BasePickerViewProps {
  value?: string | string[] | number[];
  defaultValue?: string | string[] | number[];
  valueMember?: string;
  dataSource?: object[];
  onInit?: (value?: object[], i?: number) => void;
  onChange?: (value?: object[], i?: number) => void;
  itemRender?: (item?: object) => string;
  cols?: number;
  disabled?: boolean;
}

export interface BasePickerProps extends BasePickerViewProps {
  visible?: boolean;
  title?: string;
  cancelText?: string;
  okText?: string;
  onOk?: (value?: object) => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  children?: any;
}
