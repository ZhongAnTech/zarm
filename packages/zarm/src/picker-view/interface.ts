import type { BaseWheelProps, WheelValue } from '../wheel/interface';

export interface PickerDataSourceItem {
  value: WheelValue;
  label?: React.ReactNode;
  children?: PickerDataSourceItem[];
}

export interface FieldNames {
  value?: string;
  label?: string;
  children?: string;
}

export interface BasePickerViewProps
  extends Pick<BaseWheelProps, 'itemRender' | 'disabled' | 'stopScroll'> {
  value?: WheelValue | WheelValue[];
  defaultValue?: WheelValue | WheelValue[];
  wheelDefaultValue?: WheelValue | WheelValue[];
  fieldNames?: FieldNames;
  dataSource?: PickerDataSourceItem[];
  onChange?: (value: WheelValue[], dataSource: PickerDataSourceItem[], level?: number) => void;
  cols?: number;
}
