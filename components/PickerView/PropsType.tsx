export interface BasePickerViewProps {
  visible?: boolean;
  dataSource?: any[];
  defaultValue?: string | any[];
  value?: string | any[];
  cols?: number;
  onChange?: (value?: any) => any;
  valueMember?: string;
  onValueChange?: (value?: any, i?: number) => void;
  itemRender?: (data?: object) => string;
}
