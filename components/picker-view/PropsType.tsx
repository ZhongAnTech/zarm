export interface BasePickerViewProps {
  value?: string | string[] | number[];
  defaultValue?: string | string[] | number[] | object;
  firstObjValue?: object[];
  valueMember?: string;
  dataSource?: object[];
  onInit?: (value?: object[], i?: number) => void;
  onChange?: (value?: object[], i?: number) => void;
  itemRender?: (item?: object) => string;
  cols?: number;
  disabled?: boolean;
  onTransition?: (value: boolean) => void;
}
