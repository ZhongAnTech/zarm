import BaseWheelProps, { WheelValue, WheelItem } from '../wheel/PropsType';

export type DataSource<T = { label: string; value: WheelValue }> = Array<
  T & { children?: DataSource<T> }
>;

export default interface BasePickerViewProps
  extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'> {
  value?: WheelValue | Array<WheelValue>;
  defaultValue?: WheelValue | Array<WheelValue>;
  wheelDefaultValue?: WheelValue | Array<WheelValue>;
  dataSource: DataSource;
  onChange?: (value?: Array<WheelItem>, i?: number) => void;
  cols?: number;
}
