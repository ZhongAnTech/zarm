
export type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

export default interface BasePickerViewProps {
  value: string | string[] | number[];
  defaultValue?: string | string[] | number[] | object;
  valueMember?: string;
  dataSource: DataSource;
  onChange?: (value?: object[], i?: number) => void;
  itemRender?: (item?: object) => string;
  cols?: number;
  disabled?: boolean;
  onTransition?: (value: boolean) => void;
}
