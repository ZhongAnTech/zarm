export type DatePickerValue = string | Date;

export interface BaseDatePickerViewProps {
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  wheelDefaultValue?: DatePickerValue;
  onChange?: (value?: Date) => void;
  minuteStep?: number;
  min?: DatePickerValue;
  max?: DatePickerValue;
  stopScroll?: boolean;
  use12Hours?: boolean;
}
