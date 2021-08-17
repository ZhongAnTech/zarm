import { ReactNode } from 'react';
import type { Locale } from '../config-provider/PropsType';

export interface BaseCalendarProps {
  value?: Date | Date[];
  defaultValue?: Date | Date[];
  min?: Date;
  max?: Date;
  multiple: boolean;
  dateRender?: (value?: Date) => ReactNode;
  disabledDate?: (value?: Date) => boolean;
  onChange?: (value?: Date[]) => void;
  locale?: Locale['Calendar'];
}

export interface BaseCalendarMonthProps {
  value: Date[];
  min: Date;
  max: Date;
  dateMonth: Date;
  dateRender?: (value?: Date) => ReactNode;
  disabledDate?: (value?: Date) => boolean;
  onDateClick?: (value?: Date) => void;
  locale?: Locale['Calendar'];
}
