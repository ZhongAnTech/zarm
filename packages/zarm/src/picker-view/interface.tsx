import type { BaseWheelProps, WheelValue } from '../wheel/interface';

export interface PickerDataSourceItem {
  value: WheelValue;
  label?: React.ReactNode;
  children?: PickerDataSourceItem[];
}

export interface BasePickerViewProps
  extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'> {
  value?: WheelValue | WheelValue[];
  defaultValue?: WheelValue | WheelValue[];
  wheelDefaultValue?: WheelValue | WheelValue[];
  dataSource?: PickerDataSourceItem[];
  onChange?: (value: WheelValue[], dataSource: PickerDataSourceItem[], level?: number) => void;
  cols?: number;
}
