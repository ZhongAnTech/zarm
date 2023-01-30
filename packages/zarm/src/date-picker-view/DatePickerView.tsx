import clamp from 'lodash/clamp';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import PickerView, { PickerColumnItem, PickerValue } from '../picker-view';
import { resolved } from '../picker-view/utils';
import { useSafeState } from '../utils/hooks';
import { BaseDatePickerViewProps, COLUMN_TYPE } from './interface';
import {
  dateToStringArray,
  generateDatePickerColumns,
  stringArrayToDate,
  useRenderLabel,
} from './utils';

const currentYear = new Date().getFullYear();

export interface DatePickerViewProps extends BaseDatePickerViewProps {
  className?: string;
}

export interface DatePickerViewInstance {
  value: Date;
  items: PickerColumnItem[];
}

const DatePickerView = React.forwardRef<DatePickerViewInstance, DatePickerViewProps>(
  (props, ref) => {
    const {
      min = new Date(new Date().setFullYear(currentYear - 10)),
      max = new Date(new Date().setFullYear(currentYear + 10)),
      columnType = [COLUMN_TYPE.YEAR, COLUMN_TYPE.MONTH, COLUMN_TYPE.DAY],
      value,
      defaultValue,
      filter,
      renderLabel,
      onChange,
      ...rest
    } = props;
    const [innerValue, setInnerValue] = useSafeState(value || defaultValue);
    const prevColumnType = React.useRef(columnType);
    const defaultRenderLabel = useRenderLabel(renderLabel);

    React.useEffect(() => {
      if (props.value === undefined) return;
      if (isEqual(props.value, innerValue)) return;
      setInnerValue(props.value);
    }, [props.value]);

    React.useEffect(() => {
      prevColumnType.current = columnType;
    }, [columnType]);

    const now = React.useMemo(() => new Date(), []);

    const currentValue = React.useMemo(() => {
      const date = innerValue || now;
      return new Date(clamp(date.getTime(), min.getTime(), max.getTime()));
    }, [innerValue, min, max, columnType]);

    const pickerValue = React.useMemo(
      () => dateToStringArray(currentValue, columnType),
      [currentValue, columnType],
    );

    const wheelDefaultValue = React.useMemo(
      () => dateToStringArray(props.wheelDefaultValue, columnType),
      [props.wheelDefaultValue, columnType],
    );

    const handleChange = React.useCallback(
      (changedPickerValue: PickerValue[], items: PickerColumnItem[], level: number) => {
        if (prevColumnType.current[level] !== columnType[level]) return;
        const date = stringArrayToDate(
          currentValue,
          changedPickerValue as number[],
          columnType,
          level,
        );
        setInnerValue(date);
        onChange?.(date, items, level);
      },
      [currentValue, prevColumnType, columnType],
    );

    const { items, columns } = resolved({
      dataSource: generateDatePickerColumns(
        currentValue,
        min,
        max,
        columnType,
        defaultRenderLabel,
        filter,
      ),
      value: pickerValue,
    });

    React.useImperativeHandle(ref, () => ({
      value: currentValue,
      items,
    }));

    return (
      <PickerView
        {...rest}
        value={pickerValue}
        wheelDefaultValue={wheelDefaultValue}
        dataSource={columns}
        onChange={handleChange}
      />
    );
  },
);

export default DatePickerView;
