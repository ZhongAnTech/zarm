import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import PickerView from '../picker-view';
import { ConfigContext } from '../n-config-provider';
import { isExtendDate, parseState } from './utils/parseState';
import { cloneDate, getDaysInMonth, pad, setMonth } from './utils/date';
import type { BaseDatePickerViewProps } from './interface';
import { HTMLProps } from '../utils/utilityTypes';

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

export interface DatePickerInstance {
  value: Date;
}

const DatePickerView = React.forwardRef<DatePickerInstance, DatePickerViewProps>((props, ref) => {
  const { locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.DatePickerView;

  const {
    className,
    defaultValue,
    wheelDefaultValue,
    minuteStep,
    min,
    max,
    mode,
    use12Hours,
    onChange,
    ...others
  } = props;

  const [state, setState] = useState<DatePickerViewState>(parseState(props));

  const minDate = useMemo(() => {
    const date = isExtendDate(min);
    return min && date ? new Date(date) : new Date(1900, 1, 1, 0, 0, 0);
  }, [min]);

  const maxDate = useMemo(() => {
    const year = new Date().getFullYear() + 20;
    const date = isExtendDate(max);
    return max && date ? new Date(date) : new Date(year, 1, 1, 23, 59, 59);
  }, [max]);

  useEffect(() => {
    setState(parseState(props));
  }, [defaultValue, minuteStep, wheelDefaultValue, min, max, mode, use12Hours]);

  const setHours = (date, hour) => {
    if (use12Hours) {
      const currentHours = date.getHours();
      let newHour = hour;
      newHour = currentHours >= 12 ? hour + 12 : hour;
      newHour = newHour >= 24 ? 0 : newHour;
      date.setHours(newHour);
    } else {
      date.setHours(hour);
    }
  };

  const setAmPm = (date, index) => {
    if (index === 0) {
      date.setTime(+date - ONE_DAY / 2);
    } else {
      date.setTime(+date + ONE_DAY / 2);
    }
  };

  const getNewDate = useCallback(
    (values, index, date: Date) => {
      const value = parseInt(values[index], 10);
      const newValue = cloneDate(date);
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
            setHours(newValue, value);
            break;
          case 4:
            newValue.setMinutes(value);
            break;
          case 5:
            setAmPm(newValue, value);
            break;
          default:
            break;
        }
      } else {
        switch (index) {
          case 0:
            setHours(newValue, value);
            break;
          case 1:
            newValue.setMinutes(value);
            break;
          case 2:
            setAmPm(newValue, value);
            break;
          default:
            break;
        }
      }
      return clipDate(newValue);
    },
    [mode],
  );

  const clipDate = useCallback(
    (date) => {
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
    },
    [minDate, maxDate, mode],
  );

  const defaultDate = useMemo((): Date => {
    // 存在最小值且毫秒数大于现在
    if (min && minDate.getTime() >= Date.now()) {
      return minDate;
    }
    if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
      return new Date(new Date().setMinutes(0));
    }
    return new Date();
  }, [min, minuteStep, mode]);

  const currentDate = useMemo(() => {
    const { date, wheelDefault } = state;
    return clipDate(date || wheelDefault || defaultDate);
  }, [state, defaultDate, mode]);

  React.useImperativeHandle(ref, () => ({
    value: currentDate,
  }));

  const dateData = useMemo(() => {
    const yearCol: Array<DataSource> = [];
    const monthCol: Array<DataSource> = [];
    const dayCol: Array<DataSource> = [];

    const selectYear = currentDate.getFullYear();
    const selectMonth = currentDate.getMonth();

    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();

    for (let i = minYear; i <= maxYear; i += 1) {
      yearCol.push({
        label: i + locale?.year!,
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
        label: i + 1 + locale?.month!,
        value: i,
      });
    }

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    const minDay = selectYear === minYear && selectMonth === minMonth ? minDate.getDate() : 1;
    const maxDay =
      selectYear === maxYear && selectMonth === maxMonth
        ? maxDate.getDate()
        : getDaysInMonth(currentDate);
    for (let i = minDay; i <= maxDay; i += 1) {
      dayCol.push({
        label: i + locale?.day!,
        value: i,
      });
    }
    return [yearCol, monthCol, dayCol];
  }, [currentDate, minDate, maxDate, locale, use12Hours, mode]);

  const getDisplayHour = (rawHour) => {
    if (use12Hours) {
      if (rawHour === 0) {
        rawHour = 12;
      }
      if (rawHour > 12) {
        rawHour -= 12;
      }
      return rawHour;
    }
    return rawHour;
  };

  const timeData = useMemo(() => {
    const hourCol: Array<DataSource> = [];
    const minuteCol: Array<DataSource> = [];

    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const minDateHour = minDate.getHours();
    const maxDateHour = maxDate.getHours();
    const minDateMinute = minDate.getMinutes();
    const maxDateMinute = maxDate.getMinutes();
    const selectHour = currentDate.getHours();

    if (mode === DATETIME) {
      const selectYear = currentDate.getFullYear();
      const selectMonth = currentDate.getMonth();
      const selectDay = currentDate.getDate();
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

    if ((minHour === 0 && maxHour === 0) || (minHour !== 0 && maxHour !== 0)) {
      minHour = getDisplayHour(minHour);
    } else if (minHour === 0 && use12Hours) {
      minHour = 1;
      hourCol.push({ value: 0, label: locale?.hour ? 12 + locale?.hour : '12' });
    }
    maxHour = getDisplayHour(maxHour);

    for (let i = minHour; i <= maxHour; i += 1) {
      hourCol.push({
        label: locale?.hour ? i + locale?.hour : pad(i),
        value: i,
      });
    }

    for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
      minuteCol.push({
        label: locale?.minute ? i + locale?.minute : pad(i),
        value: i,
      });
    }

    if (use12Hours) {
      return [
        hourCol,
        minuteCol,
        [
          { value: 0, label: locale?.am },
          { value: 1, label: locale?.pm },
        ],
      ];
    }

    return [hourCol, minuteCol];
  }, [minDate, maxDate, currentDate, locale, use12Hours, mode]);

  const colsValue = useMemo(() => {
    let dataSource: any[] = [];
    let value: any[] = [];

    if (mode === YEAR) {
      dataSource = dateData;
      value = [currentDate.getFullYear()];
    }

    if (mode === MONTH) {
      dataSource = dateData;
      value = [currentDate.getFullYear(), currentDate.getMonth()];
    }

    if (mode === DATE || mode === DATETIME) {
      dataSource = dateData;
      value = [currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()];
    }
    if (mode === DATETIME || mode === TIME) {
      dataSource = [...dataSource, ...timeData];
      const hour = currentDate.getHours();
      if (use12Hours) {
        value = [
          ...value,
          hour > 12 ? hour - 12 : hour,
          currentDate.getMinutes(),
          hour < 12 ? 0 : 1,
        ];
      } else {
        value = [...value, hour, currentDate.getMinutes()];
      }
    }
    return { dataSource, value };
  }, [currentDate, dateData, timeData, mode]);

  const onValueChange = (selected, _dataSource, index) => {
    const newValue = getNewDate(selected, index, currentDate);
    setState({
      ...state,
      date: newValue,
    });
    onChange?.(newValue);
  };

  const { dataSource, value } = colsValue;
  return (
    <PickerView
      {...others}
      className={className}
      dataSource={dataSource}
      value={value}
      onChange={onValueChange}
    />
  );
});

DatePickerView.defaultProps = {
  mode: DATE,
  disabled: false,
  minuteStep: 1,
  stopScroll: false,
  use12Hours: false,
};

export default DatePickerView;
