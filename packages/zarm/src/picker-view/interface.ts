import type {
  BaseWheelProps,
  WheelItem,
  WheelValue,
  FieldNames as WheelFieldNames,
} from '../wheel/interface';

export type PickerViewValue = WheelValue;

export type PickerViewColumnItem = WheelItem;

export type PickerViewColumn = PickerViewColumnItem[];

export interface PickerViewOption extends PickerViewColumnItem {
  children?: PickerViewOption[];
}

export type PickerViewDataSource = (PickerViewColumn | PickerViewOption)[];

export interface FieldNames extends WheelFieldNames {
  children: string;
}

export interface BasePickerViewProps extends Pick<BaseWheelProps, 'itemRender' | 'disabled'> {
  value?: PickerViewValue | PickerViewValue[];
  defaultValue?: PickerViewValue | PickerViewValue[];
  wheelDefaultValue?: PickerViewValue | PickerViewValue[];
  fieldNames?: Partial<FieldNames>;
  dataSource?: PickerViewDataSource;
  cols?: number;
  onChange?: (value: PickerViewValue[], items: PickerViewColumnItem[], level: number) => void;
}
