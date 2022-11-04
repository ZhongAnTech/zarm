import type { PickerViewColumnItem } from '../picker-view/interface';

export type DatePickerValue = string | Date;

export enum MODE {
  DATETIME = 'datetime',
  DATE = 'date',
  TIME = 'time',
  MONTH = 'month',
  YEAR = 'year',
}

export type columnType = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'second';

export interface BaseDatePickerViewProps {
  mode?: `${MODE}`;
  disabled?: boolean;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  wheelDefaultValue?: DatePickerValue;
  onChange?: (value?: Date) => void;
  minuteStep?: number;
  min?: DatePickerValue;
  max?: DatePickerValue;
  use12Hours?: boolean;
  format?: string;
  itemRender?: (item: PickerViewColumnItem, type: columnType) => React.ReactNode;
}
