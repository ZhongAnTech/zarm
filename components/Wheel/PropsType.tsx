export interface BaseWheelProps {
  value?: string[];
  defaultValue?: string;
  valueMember?: string;
  dataSource?: object[];
  onChange?: (value?: any) => void;
  itemRender?: (data?: object) => string;
  disabled?: boolean;
}

export interface BaseWheelGroupProps {
  value?: string[];
  defaultValue?: string;
  valueMember?: string;
  dataSource: any[];
  children?: any[];
  onChange?: (value?: any, i?: number) => void;
  itemRender?: (data?: object) => string;
  cols?: number;
}
