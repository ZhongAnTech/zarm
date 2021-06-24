import type { Locale } from '../config-provider/PropsType';
import type { BaseDatePickerProps } from '../date-picker/PropsType';

export interface BaseDateSelectProps extends Omit<BaseDatePickerProps, 'visible' | 'locale'> {
  placeholder?: string;
  format?: string;
  hasArrow?: boolean;
  locale?: Locale['DatePickerView'] & Locale['DatePicker'] & Locale['DateSelect'];
}
