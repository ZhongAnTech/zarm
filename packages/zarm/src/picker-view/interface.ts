import type {
  BaseWheelProps,
  WheelItem,
  WheelValue,
  FieldNames as WheelFieldNames,
} from '../wheel/interface';

export type PickerValue = WheelValue;

export type PickerColumnItem = WheelItem;

export type PickerColumn = PickerColumnItem[];

export interface PickerOption extends PickerColumnItem {
  children?: PickerOption[];
}

export type PickerDataSource = (PickerColumn | PickerOption)[];

export interface FieldNames extends WheelFieldNames {
  children: string;
}

export interface BasePickerViewProps extends Pick<BaseWheelProps, 'disabled'> {
  value?: PickerValue | PickerValue[];
  defaultValue?: PickerValue | PickerValue[];
  wheelDefaultValue?: PickerValue | PickerValue[];
  fieldNames?: Partial<FieldNames>;
  dataSource?: PickerDataSource;
  cols?: number;
  itemRender?: (item: PickerColumnItem, level: number) => React.ReactNode;
  onChange?: (value: PickerValue[], items: PickerColumnItem[], level: number) => void;
}
