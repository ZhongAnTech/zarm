export interface BasePickerProps {
  visible?: boolean;
  placeholder?: string;
  title?: string;
  cancelText?: string;
  okText?: string;
  displayAddon?: string;
  disabled?: boolean;
  dataSource: object[];
  cols?: number;
  onOk: (value?: object) => void;
  onClick: () => void;
  onCancel?: () => void;
  onMaskClick?: () => void;
  displayRender?: (data?: object) => void;
  prefixCls?: string;
  displayMember: string;
  valueMember: string;
  value?: string | string[] | number[];
  onChange: (value?: any) => any;
}

export interface BasePickerStackProps {
  value: any[];
  dataSource: object[];
  valueMember: string;
  title: string;
  placeholder: string;
  disabled: boolean;
  cols: number;
  labelAddon: string;
  displayItems: number;
  itemHeight: number;
  onMaskClick?: () => void;
  onOk: (value?: any) => void;
  onCancel: () => void;
  displayRender: (data?: object) => any[];
  itemRender: (data?: object) => string;
  validate: (value?: any[]) => string;
}
