import { Locale } from '../locale-provider/PropsType';

export default interface BaseDatePickerViewProps {
  mode?: 'year' | 'month' | 'date' | 'time' | 'datetime';
  disabled?: boolean;
  value?: string | object;
  defaultValue?: string | object;
  wheelDefaultValue?: string | object;
  onInit?: (value?: object[], i?: number) => void;
  onChange?: (value?: Date) => void;
  minuteStep?: number;
  min?: object | string;
  max?: object | string;
  valueMember?: string;
  onTransition?: (value: boolean) => void;
  locale?: Locale['DatePickerView'] & Locale['DatePicker'] & Locale['DateSelect'];
}
