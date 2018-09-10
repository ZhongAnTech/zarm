import { CSSProperties } from 'react';

export interface BaseCalendarViewProps {
  value?: string | object | Array<string | object>;
  defaultValue?: string | object | Array<string | object>;
  min?: string | object;
  max?: string | object;
  multiple?: boolean;
  dateRender?: (value: Date) => void;
  disabledDate?: (value: Date) => boolean;
  onChange?: (value: Array<Date>) => void;
  style?: CSSProperties;
  prefixCls?: string;
  className?: string;
}
