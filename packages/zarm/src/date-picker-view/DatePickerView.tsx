import { useUpdateEffect } from 'ahooks';
import clamp from 'lodash/clamp';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import PickerView, {
  PickerColumnItem,
  PickerValue,
  PickerViewCssVars,
  PickerViewInstance,
} from '../picker-view';
import { resolved } from '../picker-view/utils';
import { HTMLProps } from '../utils/utilityTypes';
import { BaseDatePickerViewProps, COLUMN_TYPE } from './interface';
import {
  dateToNumberArray,
  generateDatePickerColumns,
  numberArrayToDate,
  useRenderLabel,
} from './utils';

const currentYear = new Date().getFullYear();

export type DatePickerViewProps = BaseDatePickerViewProps & HTMLProps<PickerViewCssVars>;

export interface DatePickerViewInstance {
  value: Date;
  items: PickerColumnItem[];
  reset: () => void;
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

    const pickerViewRef = React.useRef<PickerViewInstance>(null);

    const [innerValue, setInnerValue] = React.useState(value || defaultValue);
    const prevColumnType = React.useRef(columnType);
    const defaultRenderLabel = useRenderLabel(renderLabel);

    useUpdateEffect(() => {
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
      () => dateToNumberArray(currentValue, columnType),
      [currentValue, columnType],
    );

    const wheelDefaultValue = React.useMemo(
      () => dateToNumberArray(props.wheelDefaultValue, columnType),
      [props.wheelDefaultValue, columnType],
    );

    const handleChange = React.useCallback(
      (changedPickerValue: PickerValue[], items: PickerColumnItem[], level: number) => {
        if (prevColumnType.current[level] !== columnType[level]) return;
        const date = numberArrayToDate(
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
      reset: pickerViewRef.current?.reset,
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
