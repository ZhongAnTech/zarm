import type { BaseWheelProps, WheelValue } from '../wheel/interface';

export type PickerDataSource<T = { value: WheelValue; label: string }> = Array<
  T & { children?: PickerDataSource<T> }
>;

export interface BasePickerViewProps
  extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'> {
  value?: WheelValue[];
  defaultValue?: WheelValue[];
  wheelDefaultValue?: WheelValue[];
  dataSource?: PickerDataSource;
  onChange?: (value: WheelValue[], dataSource: PickerDataSource, level?: number) => void;
  cols?: number;
}
