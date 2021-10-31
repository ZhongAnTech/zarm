import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../n-config-provider';
import { isExtendDate, parseState } from './utils/parseState';
import { cloneDate, getDaysInMonth, getGregorianCalendar, pad, setMonth } from './utils/date';
import { DATETIME, DATE, TIME, MONTH, YEAR, ONE_DAY } from './constant';

const getRangeItems = (start: number, end: number, fn: Function) => {
  const items: object[] = [];
  for (let i = start; i <= end; i += 1) {
    items.push(fn(i));
  }

  return items;
};

const getRangeDate = (minDate, maxDate) => {
  return {
    min: isExtendDate(minDate) || getGregorianCalendar(1900, 0, 1, 0, 0, 0),
    max: isExtendDate(maxDate) || getGregorianCalendar(2030, 11, 30, 23, 59, 59),
  };
};

const parseDate = (date: Date) => {
  return {
    minute: date.getMinutes(),
    hour: date.getHours(),
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

const parseRangeDate = (minDate, maxDate) => {
  const date = getRangeDate(minDate, maxDate);
  return {
    max: parseDate(date.max),
    min: parseDate(date.min),
  };
};

const getDefaultDate = ({ min, max, minuteStep, mode }) => {
  const { min: minDate } = getRangeDate(min, max);

  // 存在最小值且毫秒数大于现在
  if (min && minDate.getTime() >= Date.now()) {
    return minDate;
  }

  if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
    return new Date(new Date().setMinutes(0));
  }

  return new Date();
};

const useDatePicker = (props) => {
  const { onInit, onChange, mode, valueMember, min, max, minuteStep } = props;
  const [state, setState] = useState<{ date: any; wheelDefault: any }>(parseState(props));

  const { locale: globalLocal } = useContext(ConfigContext);
  const locale = globalLocal?.DatePickerView;

  const clipDate = (date) => {
    const { min: minDate, max: maxDate } = getRangeDate(min, max);

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

  const getDate = () => {
    const date = state.date || state.wheelDefault || getDefaultDate({ min, max, minuteStep, mode });
    return clipDate(date);
  };

  const getNewDate = (values, index) => {
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

  const onValueChange = (selected, index) => {
    const newValue = getNewDate(selected, index);
    setState((preState) => ({ ...preState, date: newValue }));

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  const getDateData = () => {
    const date = getDate();

    const { min: minDate, max: maxDate } = parseRangeDate(min, max);

    const selectYear = date.getFullYear();
    const selectMonth = date.getMonth();
    const minYear = minDate.year;
    const maxYear = maxDate.year;

    const yearCol = getRangeItems(minYear, maxYear, (item: number) => ({
      label: item + locale!.year,
      value: item,
    }));

    if (mode === YEAR) {
      return [yearCol];
    }

    let minMonth = 0;
    let maxMonth = 11;

    if (selectYear === minYear) {
      minMonth = minDate.month;
    }
    if (selectYear === maxYear) {
      maxMonth = maxDate.month;
    }

    const monthCol = getRangeItems(minMonth, maxMonth, (item: number) => ({
      label: item + 1 + locale!.month,
      value: item,
    }));

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (selectYear === minYear && selectMonth === minMonth) {
      minDay = minDate.day;
    }

    if (selectYear === maxYear && selectMonth === maxMonth) {
      maxDay = maxDate.day;
    }

    const dayCol = getRangeItems(minDay, maxDay, (item: number) => ({
      label: item + locale!.day,
      value: item,
    }));

    if (mode === DATE) {
      return [yearCol, monthCol, dayCol];
    }

    return [yearCol, monthCol, dayCol];
  };

  const getTimeData = () => {
    const date = getDate();

    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const { min: minDate, max: maxDate } = parseRangeDate(min, max);

    const minDateHour = minDate.hour;
    const maxDateHour = maxDate.hour;
    const minDateMinute = minDate.minute;
    const maxDateMinute = maxDate.minute;
    const selectHour = date.getHours();

    if (mode === DATETIME) {
      const selectYear = date.getFullYear();
      const selectMonth = date.getMonth();
      const selectDay = date.getDate();

      const minYear = minDate.year;
      const maxYear = maxDate.year;
      const minMonth = minDate.month;
      const maxMonth = maxDate.month;
      const minDay = minDate.day;
      const maxDay = maxDate.day;

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

    const hourCol = getRangeItems(minHour, maxHour, (item: number) => ({
      label: locale!.hour ? item + locale!.hour : pad(item),
      value: item,
    }));

    const minuteCol = getRangeItems(minMinute, maxMinute, (item: number) => ({
      label: locale!.minute ? item + locale!.minute : pad(item),
      value: item,
    }));

    return [hourCol, minuteCol];
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
      dataSource = dataSource.concat(getTimeData());
      value = value.concat([date.getHours(), date.getMinutes()]);
    }
    if (mode === TIME) {
      dataSource = getTimeData();
      value = [date.getHours(), date.getMinutes()];
    }

    return {
      dataSource,
      value,
    };
  };

  useEffect(() => {
    if (typeof onInit === 'function') {
      onInit(getDate());
    }
  }, []);

  return { ...getColsValue(), onValueChange };
};

export default useDatePicker;
