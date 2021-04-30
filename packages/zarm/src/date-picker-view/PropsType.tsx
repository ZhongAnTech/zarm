import { Locale } from '../config-provider/PropsType';

export type DateValue = string | Date;
export default interface BaseDatePickerViewProps {
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: DateValue;
  defaultValue?: DateValue;
  wheelDefaultValue?: DateValue;
  onInit?: (value?: object[], i?: number) => void;
  onChange?: (value?: Date) => void;
  minuteStep?: number;
  min?: DateValue;
  max?: DateValue;
  valueMember?: string;
  locale?: Locale['DatePickerView'] & Locale['DatePicker'] & Locale['DateSelect'];
  stopScroll?: boolean;
}
