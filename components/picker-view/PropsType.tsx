import BaseWheelProps, { WheelValue, IWheelItem } from '../wheel/PropsType';

export type DataSource = Array<{ [key: string]: WheelValue | DataSource }>;

export default interface BasePickerViewProps extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'> {
  value?: WheelValue | Array<WheelValue>;
  defaultValue?: WheelValue | Array<WheelValue>;
  wheelDefaultValue?: WheelValue | Array<WheelValue>;
  dataSource: DataSource;
  onChange?: (value?: Array<IWheelItem>, i?: number) => void;
  cols?: number;
}
