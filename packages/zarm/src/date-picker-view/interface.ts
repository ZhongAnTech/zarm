export type DatePickerValue = string | Date;

export interface BaseDatePickerViewProps {
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  wheelDefaultValue?: DatePickerValue;
  onInit?: (value?: object[], i?: number) => void;
  onChange?: (value?: Date) => void;
  minuteStep?: number;
  min?: DatePickerValue;
  max?: DatePickerValue;
  valueMember?: string;
  stopScroll?: boolean;
}
