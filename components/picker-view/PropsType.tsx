export interface BasePickerViewProps {
  value?: string | string[] | number[];
  defaultValue?: string | string[] | number[] | object;
  valueMember?: string;
  dataSource?: object[];
  onChange?: (value?: object[], i?: number) => void;
  itemRender?: (item?: object) => string;
  cols?: number;
  disabled?: boolean;
  visible?: boolean;
  onTransition?: (value: boolean) => void;
}
