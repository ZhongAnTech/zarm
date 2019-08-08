type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

export interface BasePickerViewProps {
  value?: string | string[] | number[];
  defaultValue?: string | string[] | number[] | object;
  valueMember?: string;
  dataSource?: DataSource;
  onChange?: (value?: object[], i?: number) => void;
  itemRender?: (item?: object) => string;
  cols?: number;
  disabled?: boolean;
  visible?: boolean;
  onTransition?: (value: boolean) => void;
}

export interface BasePickerViewState {
  value: string[] | number[];
  dataSource: DataSource;
}
