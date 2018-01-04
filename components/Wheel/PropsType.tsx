export interface BaseWheelProps {
  value?: string | number;
  defaultValue?: string | number;
  valueMember?: string;
  dataSource?: object[];
  onChange?: (value?: any) => void;
  itemRender?: (item?: object) => string;
  disabled?: boolean;
}

export interface BaseWheelGroupProps {
  value?: string | string[] | number[];
  defaultValue?: string | string[] | number[];
  valueMember?: string;
  dataSource?: object[];
  onChange?: (value?: object[], i?: number) => void;
  itemRender?: (item?: object) => string;
  cols?: number;
  disabled?: boolean;
}
