import React, { useCallback, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import PickerView from '../picker-view';
import { ConfigContext } from '../n-config-provider';
import { parseState } from './utils/parseState';
import { cloneDate, getDaysInMonth, pad, setMonth } from './utils/date';
import type { BaseDatePickerViewProps } from './interface';
import { HTMLProps } from '../utils/utilityTypes';

dayjs.extend(minMax);

export type DatePickerViewProps = BaseDatePickerViewProps & HTMLProps;

export type DatePickerViewState = ReturnType<typeof parseState>;

interface DataSource {
  label: string;
  value: string | number;
}

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;

const DatePickerView = (props: DatePickerViewProps) => {
  const { locale: globalLocal } = useContext(ConfigContext);
  const {
    className,
    defaultValue,
    wheelDefaultValue,
    minuteStep,
    min,
    valueMember,
    max,
    mode,
    onChange,
    onInit,
    ...others
  } = props;

  const [state, setState] = useState(parseState(props));

  useEffect(() => {
    setState(parseState(props));
  }, [defaultValue, minuteStep, wheelDefaultValue, min, valueMember, max, mode]);

  useEffect(() => {
    if (typeof onInit === 'function') {
      onInit(getDate());
    }
  }, []);

  const getNewDate = (values: Array<any>, index: number) => {
    const value = parseInt(values[index][valueMember!], 10);
    const newValue = cloneDate(getDate());
    if (mode === YEAR || mode === MONTH || mode === DATE || mode === DATETIME) {
      switch (index) {
        case 0:
          newValue.setFullYear(value);
          break;
        case 1:
          setMonth(newValue, value);
          break;
        case 2:
          newValue.setDate(value);
          break;
        case 3:
          newValue.setHours(value);
          break;
        case 4:
          newValue.setMinutes(value);
          break;
        default:
          break;
      }
    } else {
      switch (index) {
        case 0:
          newValue.setHours(value);
          break;
        case 1:
          newValue.setMinutes(value);
          break;
        default:
          break;
      }
    }
    return clipDate(newValue);
  };

  const clipDate = (date) => {
    const minDate = getMinDate();
    const maxDate = getMaxDate();
    if (mode === DATETIME) {
      if (date < minDate) {
        return cloneDate(minDate);
      }
      if (date > maxDate) {
        return cloneDate(maxDate);
      }
    } else if (mode === DATE || mode === MONTH || mode === YEAR) {
      if (+date + ONE_DAY <= +minDate) {
        return cloneDate(minDate);
      }
      if (date >= +maxDate + ONE_DAY) {
        return cloneDate(maxDate);
      }
    } else {
      const maxHour = maxDate.getHours();
      const maxMinutes = maxDate.getMinutes();
      const minHour = minDate.getHours();
      const minMinutes = minDate.getMinutes();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      if (hour < minHour || (hour === minHour && minutes < minMinutes)) {
        return cloneDate(minDate);
      }
      if (hour > maxHour || (hour === maxHour && minutes > maxMinutes)) {
        return cloneDate(maxDate);
      }
    }
    return date;
  };

  const getMinDate = () => {
    return min && dayjs(min).isValid() ? new Date(min!) : new Date(2000, 1, 1, 0, 0, 0);
  };

  const getMaxDate = () => {
    const year = new Date().getFullYear() + 20;
    return max && dayjs(max).isValid() ? new Date(max!) : new Date(year, 1, 1, 23, 59, 59);
  };

  const getDefaultDate = (): Date => {
    // 存在最小值且毫秒数大于现在
    if (min && getMinDate().getTime() >= Date.now()) {
      return getMinDate();
    }
    if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
      return new Date(new Date().setMinutes(0));
    }
    return new Date();
  };

  const getDateData = () => {
    const date = getDate();

    const yearCol: Array<DataSource> = [];
    const monthCol: Array<DataSource> = [];
    const dayCol: Array<DataSource> = [];

    const selectYear = date.getFullYear();
    const selectMonth = date.getMonth();

    const minDate = getMinDate();
    const maxDate = getMaxDate();
    const minYear = minDate.getFullYear();

    const maxYear = maxDate.getFullYear();
    for (let i = minYear; i <= maxYear; i += 1) {
      yearCol.push({
        label: i + globalLocal?.DatePickerView?.year!,
        value: i,
      });
    }
    if (mode === YEAR) {
      return [yearCol];
    }

    const minMonth = selectYear === minYear ? minDate.getMonth() : 0;
    const maxMonth = selectYear === maxYear ? maxDate.getMonth() : 11;

    for (let i = minMonth; i <= maxMonth; i += 1) {
      monthCol.push({
        label: i + 1 + globalLocal?.DatePickerView?.month!,
        value: i,
      });
    }

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    const minDay = selectYear === minYear && selectMonth === minMonth ? minDate.getDate() : 1;
    const maxDay =
      selectYear === maxYear && selectMonth === maxMonth ? maxDate.getDate() : getDaysInMonth(date);
    for (let i = minDay; i <= maxDay; i += 1) {
      dayCol.push({
        label: i + globalLocal?.DatePickerView?.day!,
        value: i,
      });
    }
    return [yearCol, monthCol, dayCol];
  };

  const getTimeData = () => {
    const date = getDate();
    const hourCol: Array<DataSource> = [];
    const minuteCol: Array<DataSource> = [];

    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const minDate = getMinDate();
    const maxDate = getMaxDate();

    const minDateHour = minDate.getHours();
    const maxDateHour = maxDate.getHours();
    const minDateMinute = minDate.getMinutes();
    const maxDateMinute = maxDate.getMinutes();
    const selectHour = date.getHours();

    if (mode === DATETIME) {
      const selectYear = date.getFullYear();
      const selectMonth = date.getMonth();
      const selectDay = date.getDate();
      const minYear = minDate.getFullYear();
      const maxYear = maxDate.getFullYear();
      const minMonth = minDate.getMonth();
      const maxMonth = maxDate.getMonth();
      const minDay = minDate.getDate();
      const maxDay = maxDate.getDate();

      if (selectYear === minYear && selectMonth === minMonth && selectDay === minDay) {
        minHour = minDateHour;
        if (selectHour === minHour) {
          minMinute = minDateMinute;
        }
      }

      if (selectYear === maxYear && selectMonth === maxMonth && selectDay === maxDay) {
        maxHour = maxDateHour;
        if (selectHour === maxHour) {
          maxMinute = maxDateMinute;
        }
      }
    } else {
      minHour = minDateHour;
      if (selectHour === minHour) {
        minMinute = minDateMinute;
      }

      maxHour = maxDateHour;
      if (selectHour === maxHour) {
        maxMinute = maxDateMinute;
      }
    }

    for (let i = minHour; i <= maxHour; i += 1) {
      hourCol.push({
        label: globalLocal?.DatePickerView?.hour ? i + globalLocal?.DatePickerView?.hour : pad(i),
        value: i,
      });
    }

    for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
      minuteCol.push({
        label: globalLocal?.DatePickerView?.minute
          ? i + globalLocal?.DatePickerView?.minute
          : pad(i),
        value: i,
      });
    }

    return [hourCol, minuteCol];
  };

  const getDate = () => {
    const { date, wheelDefault } = state;
    return clipDate(date || wheelDefault || getDefaultDate());
  };

  const getColsValue = () => {
    const date = getDate();

    let dataSource: any[] = [];
    let value: any[] = [];

    if (mode === YEAR) {
      dataSource = getDateData();
      value = [date.getFullYear()];
    }

    if (mode === MONTH) {
      dataSource = getDateData();
      value = [date.getFullYear(), date.getMonth()];
    }
    if (mode === DATE || mode === DATETIME) {
      dataSource = getDateData();
      value = [date.getFullYear(), date.getMonth(), date.getDate()];
    }
    if (mode === DATETIME) {
      dataSource = [...dataSource, ...getTimeData()];
      value = [...value, date.getHours(), date.getMinutes()];
    }
    if (mode === TIME) {
      dataSource = getTimeData();
      value = [date.getHours(), date.getMinutes()];
    }

    return { dataSource, value };
  };

  const onValueChange = useCallback(
    (selected, index) => {
      const newValue = getNewDate(selected, index);
      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    },
    [onChange],
  );

  const { dataSource, value } = getColsValue();

  return (
    <PickerView
      {...others}
      className={className}
      dataSource={dataSource}
      value={value}
      onChange={onValueChange}
    />
  );
};

DatePickerView.defaultProps = {
  mode: DATE,
  disabled: false,
  minuteStep: 1,
  valueMember: 'value',
  stopScroll: false,
};

export default DatePickerView;
