import BaseWheelProps from '../wheel/PropsType';

export type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

export default interface BasePickerViewProps extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'>{
  value?: string | string[] | number[];
  defaultValue?: string | string[] | number[] | object;
  dataSource: DataSource;
  onChange?: (value?: object[], i?: number) => void;
  cols?: number;
}
