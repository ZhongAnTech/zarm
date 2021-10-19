import type { BaseWheelProps, WheelValue, WheelItem } from '../wheel/interface';

export type PickerDataSource<T = { value: WheelValue; label: string }> = Array<
  T & { children?: PickerDataSource<T> }
>;

export interface BasePickerViewProps
  extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'> {
  value?: WheelValue | Array<WheelValue>;
  defaultValue?: WheelValue | Array<WheelValue>;
  wheelDefaultValue?: WheelValue | Array<WheelValue>;
  dataSource: PickerDataSource;
  onChange?: (value?: Array<WheelItem>, i?: number) => void;
  cols?: number;
}
