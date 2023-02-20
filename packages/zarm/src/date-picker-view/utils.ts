import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isFunction from 'lodash/isFunction';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import { PickerColumn, PickerColumnItem } from '../picker-view';
import { ColumnType, COLUMN_TYPE, DatePickerFilter, MERIDIEM, RenderLabel } from './interface';

dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

export const generateMeridiemHour = (hour: number, hasMeridiem: boolean) => {
  if (!hasMeridiem) return hour;
  if (hour === 0) hour = 12;
  if (hour > 12) hour -= 12;
  return hour;
};

export const useRenderLabel = (renderLabel?: RenderLabel): RenderLabel => {
  const { locale: globalLocale } = React.useContext(ConfigContext);
  const locale = globalLocale?.DatePickerView;

  return React.useCallback(
    (type, value) => {
      if (isFunction(renderLabel)) {
        return renderLabel(type, value);
      }

      switch (type) {
        case COLUMN_TYPE.YEAR:
          return value + locale.year;
        case COLUMN_TYPE.MONTH:
          return value + locale.month;
        case COLUMN_TYPE.WEEK:
          return value + locale.week;
        case COLUMN_TYPE.WEEK_DAY:
          return locale.weeks[value - 1];
        case COLUMN_TYPE.DAY:
          return value + locale.day;
        case COLUMN_TYPE.HOUR:
          return value + locale.hour;
        case COLUMN_TYPE.MINUTE:
          return value + locale.minute;
        case COLUMN_TYPE.SECOND:
          return value + locale.second;
        case COLUMN_TYPE.MERIDIEM:
          return value === MERIDIEM.AM ? locale.am : locale.pm;
        default:
          return value.toString();
      }
    },
    [renderLabel],
  );
};

export const padZero = (value: string | number, length = 2) => {
  return String(value).padStart(length, '0');
};

export const generateDatePickerColumns = (
  selectedValue: Date,
  min: Date,
  max: Date,
  columnType: ColumnType[],
  renderLabel: RenderLabel,
  filter?: DatePickerFilter,
) => {
  const hasMeridiem = columnType.includes(COLUMN_TYPE.MERIDIEM);

  const date = dayjs(selectedValue);
  const minDate = dayjs(min);
  const maxDate = dayjs(max);

  const minYear = min.getFullYear();
  const minMonth = min.getMonth() + 1;
  const minDay = min.getDate();
  const minWeek = minDate.isoWeek();
  const minWeekday = minDate.isoWeekday();
  const minHour = min.getHours();
  const minMinute = min.getMinutes();
  const minSecond = min.getSeconds();

  const maxYear = max.getFullYear();
  const maxMonth = max.getMonth() + 1;
  const maxDay = max.getDate();
  const maxWeek = maxDate.isoWeek();
  const maxWeekday = maxDate.isoWeekday();
  const maxHour = max.getHours();
  const maxMinute = max.getMinutes();
  const maxSecond = max.getSeconds();

  const selectedYear = date.year();
  const selectedMonth = date.month() + 1;
  const selectedDay = date.date();
  const selectedWeek = date.isoWeek();
  const selectedHour = date.hour();
  const selectedMinute = date.minute();
  const selectedYearWeeks = dayjs(`${selectedYear}/01/01`).isoWeeksInYear();

  const isInMinYear = selectedYear === minYear;
  const isInMaxYear = selectedYear === maxYear;
  const isInMinMonth = isInMinYear && selectedMonth === minMonth;
  const isInMaxMonth = isInMaxYear && selectedMonth === maxMonth;
  const isInMinDay = isInMinMonth && selectedDay === minDay;
  const isInMaxDay = isInMaxMonth && selectedDay === maxDay;
  const isInMinWeek = isInMinYear && selectedWeek === minWeek;
  const isInMaxWeek = isInMaxYear && selectedWeek === maxWeek;
  const isInMinHour = isInMinDay && selectedHour === minHour;
  const isInMaxHour = isInMaxDay && selectedHour === maxHour;
  const isInMinMinute = isInMinHour && selectedMinute === minMinute;
  const isInMaxMinute = isInMaxHour && selectedMinute === maxMinute;

  const firstDayInSelectedMonth = dayjs(date).startOf('month');

  const generateColumns = <T extends PickerColumnItem>(
    from: number,
    to: number,
    type: ColumnType,
    iteratee: (index: number) => T,
  ) => {
    let options: T[] = [];
    for (let i = from; i <= to; i++) {
      options.push(iteratee(i));
    }

    if (isFunction(filter)) {
      options = options.filter((option) =>
        filter(type, {
          get value() {
            return option.value as number;
          },
          get date() {
            return selectedValue;
          },
        }),
      );
    }

    return options;
  };

  const generateMeridiemHourColumn = (hour: number) => {
    if (!hasMeridiem) return hour;
    if (hour > 12) hour -= 12;
    return hour;
  };

  const columns: PickerColumn = [];

  columnType?.forEach((type) => {
    switch (type) {
      case COLUMN_TYPE.YEAR:
        columns.push(
          generateColumns(minYear, maxYear, COLUMN_TYPE.YEAR, (index) => ({
            value: index,
            label: renderLabel(COLUMN_TYPE.YEAR, index),
          })),
        );
        break;
      case COLUMN_TYPE.MONTH:
        columns.push(
          generateColumns(
            isInMinYear ? minMonth : 1,
            isInMaxYear ? maxMonth : 12,
            COLUMN_TYPE.MONTH,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.MONTH, index),
            }),
          ),
        );
        break;
      case COLUMN_TYPE.WEEK:
        columns.push(
          generateColumns(
            isInMinYear ? minWeek : 1,
            isInMaxYear ? maxWeek : selectedYearWeeks,
            COLUMN_TYPE.WEEK,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.WEEK, index),
            }),
          ),
        );
        break;
      case COLUMN_TYPE.WEEK_DAY:
        columns.push(
          generateColumns(
            isInMinWeek ? minWeekday : 1,
            isInMaxWeek ? maxWeekday : 7,
            COLUMN_TYPE.WEEK_DAY,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.WEEK_DAY, index),
            }),
          ),
        );
        break;
      case COLUMN_TYPE.DAY:
        columns.push(
          generateColumns(
            isInMinMonth ? minDay : 1,
            isInMaxMonth ? maxDay : firstDayInSelectedMonth.daysInMonth(),
            COLUMN_TYPE.DAY,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.DAY, index),
            }),
          ),
        );
        break;
      case COLUMN_TYPE.MERIDIEM:
        columns.push(
          generateColumns(MERIDIEM.AM, MERIDIEM.PM, COLUMN_TYPE.MERIDIEM, (index) => ({
            value: index,
            label: renderLabel(COLUMN_TYPE.MERIDIEM, index),
          })),
        );
        break;
      case COLUMN_TYPE.HOUR:
        columns.push(
          generateColumns(
            generateMeridiemHourColumn(isInMinDay ? minHour : 0),
            generateMeridiemHourColumn(isInMaxDay ? maxHour : 23),
            COLUMN_TYPE.HOUR,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.HOUR, generateMeridiemHour(index, hasMeridiem)),
            }),
          ),
        );
        break;
      case COLUMN_TYPE.MINUTE:
        columns.push(
          generateColumns(
            isInMinHour ? minMinute : 0,
            isInMaxHour ? maxMinute : 59,
            COLUMN_TYPE.MINUTE,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.MINUTE, index),
            }),
          ),
        );
        break;
      case COLUMN_TYPE.SECOND:
        columns.push(
          generateColumns(
            isInMinMinute ? minSecond : 0,
            isInMaxMinute ? maxSecond : 59,
            COLUMN_TYPE.SECOND,
            (index) => ({
              value: index,
              label: renderLabel(COLUMN_TYPE.SECOND, index),
            }),
          ),
        );
        break;
    }
  });

  return columns;
};

export const dateToNumberArray = (value: Date, columnType: ColumnType[]) => {
  const date = dayjs(value);
  const hasWeek = columnType?.includes(COLUMN_TYPE.WEEK);
  const hasMeridiem = columnType?.includes(COLUMN_TYPE.MERIDIEM);
  return columnType?.map((type) => {
    switch (type) {
      case COLUMN_TYPE.YEAR:
        return hasWeek ? date.isoWeekYear() : date.year();
      case COLUMN_TYPE.MONTH:
        return date.month() + 1;
      case COLUMN_TYPE.DAY:
        return date.date();
      case COLUMN_TYPE.WEEK:
        return date.isoWeek();
      case COLUMN_TYPE.WEEK_DAY:
        return date.isoWeekday();
      case COLUMN_TYPE.MERIDIEM:
        return date.hour() >= 12 ? MERIDIEM.PM : MERIDIEM.AM;
      case COLUMN_TYPE.HOUR:
        return generateMeridiemHour(date.hour(), hasMeridiem);
      case COLUMN_TYPE.MINUTE:
        return date.minute();
      case COLUMN_TYPE.SECOND:
        return date.second();
      default:
        return undefined;
    }
  });
};

export const numberArrayToDate = (
  currentValue: Date,
  changedPickerValue: number[],
  columnType: ColumnType[],
  level: number,
) => {
  const date = dayjs(currentValue);
  const types = Object.fromEntries(
    columnType.map((type, index) => [type, changedPickerValue[index]]),
  );
  const currentColumnType = columnType[level];

  const getMeridiemHour = (meridiem: number, hour: number) => {
    if (meridiem === MERIDIEM.AM && hour >= 12) {
      hour -= 12;
    }
    if (meridiem === MERIDIEM.PM && hour < 12) {
      hour += 12;
    }
    return hour;
  };

  const getHour = (hour: number) => {
    const meridiemIndex = columnType?.findIndex((i) => i === COLUMN_TYPE.MERIDIEM);
    const meridiemValue = changedPickerValue[meridiemIndex] as number;
    return getMeridiemHour(meridiemValue, hour);
  };

  const year = types.year ?? date.isoWeekYear() ?? 1900;
  const month = types.month ?? date.month() + 1 ?? 0;
  const week = types.week ?? 1;
  const weekDay = types['week-day'] ?? 1;
  const day = types.day ?? date.date() ?? 1;
  const hour = types.hour ?? 0;
  const minute = types.minute ?? 0;
  const second = types.second ?? 0;

  const selectedMonth = month - 1;
  const selectedDay = Math.min(day, dayjs(new Date(year, selectedMonth, 1)).daysInMonth());
  const selectedHour = getHour(hour);
  const selectedDate = dayjs().hour(selectedHour).minute(minute).second(second);

  if (columnType.includes(COLUMN_TYPE.WEEK)) {
    if (currentColumnType === COLUMN_TYPE.MONTH) {
      return selectedDate.year(year).month(selectedMonth).toDate();
    }
    if (currentColumnType === COLUMN_TYPE.DAY) {
      return selectedDate.year(year).isoWeek(week).date(selectedDay).toDate();
    }
    return selectedDate.year(year).isoWeek(week).isoWeekday(weekDay).toDate();
  }

  return selectedDate.year(year).month(selectedMonth).date(selectedDay).toDate();
};
