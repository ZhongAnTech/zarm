import BaseWheelProps from '../wheel/PropsType';

export type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

export default interface BasePickerViewProps extends Pick<BaseWheelProps, 'valueMember' | 'itemRender' | 'disabled' | 'stopScroll'>{
  value?: string | number | boolean | Array<string | number | boolean>;
  defaultValue?: string | number | boolean | Array<string | number | boolean>;
  wheelDefaultValue?: string | number | boolean | Array<string | number | boolean>;
  dataSource: DataSource;
  onChange?: (value?: object[], i?: number) => void;
  cols?: number;
}
