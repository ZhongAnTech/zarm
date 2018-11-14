export interface BaseCalendarProps {
  value?: string | Date | Array<string | Date>;
  defaultValue?: string | object | Array<string | object>;
  min?: string | Date;
  max?: string | Date;
  multiple?: boolean;
  dateRender?: (value: Date) => void;
  disabledDate?: (value: Date) => boolean;
  onChange?: (value: Array<Date>) => void;
  prefixCls?: string;
  className?: string;
}
