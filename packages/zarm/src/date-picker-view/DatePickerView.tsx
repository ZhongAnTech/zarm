import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import PickerView from '../picker-view';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import { isExtendDate, parseState } from './utils/parseState';
import { cloneDate, getDaysInMonth, getGregorianCalendar, pad, setMonth } from './utils/date';
import type { BaseDatePickerViewProps } from './PropsType';

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;

export interface DatePickerViewProps extends BaseDatePickerViewProps {
  prefixCls?: string;
  className?: string;
}

export type DatePickerViewState = ReturnType<typeof parseState>;

export default class DatePickerView extends Component<DatePickerViewProps, DatePickerViewState> {
  static defaultProps: DatePickerViewProps = {
    prefixCls: 'za-date-picker-view',
    mode: DATE,
    disabled: false,
    minuteStep: 1,
    valueMember: 'value',
    stopScroll: false,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      !isEqual(
        removeFnFromProps(props, ['onChange', 'onInit', 'onTransition']),
        removeFnFromProps(state.prevProps, ['onChange', 'onInit', 'onTransition']),
      )
    ) {
      return {
        prevProps: props,
        ...parseState(props),
      };
    }

    return null;
  }

  constructor(props: DatePickerViewProps) {
    super(props);
    this.state = parseState(props);
    const { onInit } = this.props;
    if (typeof onInit === 'function') {
      onInit(this.getDate());
    }
    this.getColsValue = this.getColsValue.bind(this);
  }

  onValueChange = (selected, index) => {
    const { onChange } = this.props;
    const newValue = this.getNewDate(selected, index);
    this.setState({
      date: newValue,
    });

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  getNewDate = (values, index) => {
    const { mode, valueMember } = this.props;
    const value = parseInt(values[index][valueMember!], 10);
    const newValue = cloneDate(this.getDate());
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
    return this.clipDate(newValue);
  };

  getColsValue() {
    const { mode } = this.props;
    const date = this.getDate();

    let dataSource: any[] = [];
    let value: any[] = [];

    if (mode === YEAR) {
      dataSource = this.getDateData();
      value = [date.getFullYear()];
    }
    if (mode === MONTH) {
      dataSource = this.getDateData();
      value = [date.getFullYear(), date.getMonth()];
    }
    if (mode === DATE || mode === DATETIME) {
      dataSource = this.getDateData();
      value = [date.getFullYear(), date.getMonth(), date.getDate()];
    }
    if (mode === DATETIME) {
      dataSource = dataSource.concat(this.getTimeData());
      value = value.concat([date.getHours(), date.getMinutes()]);
    }
    if (mode === TIME) {
      dataSource = this.getTimeData();
      value = [date.getHours(), date.getMinutes()];
    }

    return {
      dataSource,
      value,
    };
  }

  getDateData = () => {
    const { locale, mode } = this.props;
    const date = this.getDate();
    const yearCol: object[] = [];
    const monthCol: object[] = [];
    const dayCol: object[] = [];

    const selectYear = date.getFullYear();
    const selectMonth = date.getMonth();
    const minYear = this.getMinYear();
    const maxYear = this.getMaxYear();

    for (let i = minYear; i <= maxYear; i += 1) {
      yearCol.push({
        label: i + locale!.year,
        value: i,
      });
    }

    if (mode === YEAR) {
      return [yearCol];
    }

    let minMonth = 0;
    let maxMonth = 11;
    if (selectYear === minYear) {
      minMonth = this.getMinMonth();
    }
    if (selectYear === maxYear) {
      maxMonth = this.getMaxMonth();
    }

    for (let i = minMonth; i <= maxMonth; i += 1) {
      monthCol.push({
        label: i + 1 + locale!.month,
        value: i,
      });
    }

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (selectYear === minYear && selectMonth === minMonth) {
      minDay = this.getMinDay();
    }

    if (selectYear === maxYear && selectMonth === maxMonth) {
      maxDay = this.getMaxDay();
    }

    for (let i = minDay; i <= maxDay; i += 1) {
      dayCol.push({
        label: i + locale!.day,
        value: i,
      });
    }

    if (mode === DATE) {
      return [yearCol, monthCol, dayCol];
    }

    return [yearCol, monthCol, dayCol];
  };

  getTimeData = () => {
    const { locale, mode, minuteStep } = this.props;
    const date = this.getDate();
    const hourCol: object[] = [];
    const minuteCol: object[] = [];

    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    const minDateHour = this.getMinHour();
    const maxDateHour = this.getMaxHour();
    const minDateMinute = this.getMinMinute();
    const maxDateMinute = this.getMaxMinute();
    const selectHour = date.getHours();

    if (mode === DATETIME) {
      const selectYear = date.getFullYear();
      const selectMonth = date.getMonth();
      const selectDay = date.getDate();
      const minYear = this.getMinYear();
      const maxYear = this.getMaxYear();
      const minMonth = this.getMinMonth();
      const maxMonth = this.getMaxMonth();
      const minDay = this.getMinDay();
      const maxDay = this.getMaxDay();

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
        label: locale!.hour ? i + locale!.hour : pad(i),
        value: i,
      });
    }

    for (let i = minMinute; i <= maxMinute; i += minuteStep!) {
      minuteCol.push({
        label: locale!.minute ? i + locale!.minute : pad(i),
        value: i,
      });
    }

    return [hourCol, minuteCol];
  };

  getDate() {
    const { date, wheelDefault } = this.state;
    return this.clipDate(date || wheelDefault || this.getDefaultDate());
  }

  getDefaultDate = () => {
    const { min, mode, minuteStep } = this.props;
    // 存在最小值且毫秒数大于现在
    if (min && this.getMinDate().getTime() >= Date.now()) {
      return this.getMinDate();
    }
    if (minuteStep && minuteStep > 1 && (mode === DATETIME || mode === TIME)) {
      return new Date(new Date().setMinutes(0));
    }
    return new Date();
  };

  getMinYear = () => {
    return this.getMinDate().getFullYear();
  };

  getMaxYear = () => {
    return this.getMaxDate().getFullYear();
  };

  getMinMonth = () => {
    return this.getMinDate().getMonth();
  };

  getMaxMonth = () => {
    return this.getMaxDate().getMonth();
  };

  getMinDay = () => {
    return this.getMinDate().getDate();
  };

  getMaxDay = () => {
    return this.getMaxDate().getDate();
  };

  getMinHour = () => {
    return this.getMinDate().getHours();
  };

  getMaxHour = () => {
    return this.getMaxDate().getHours();
  };

  getMinMinute = () => {
    return this.getMinDate().getMinutes();
  };

  getMaxMinute = () => {
    return this.getMaxDate().getMinutes();
  };

  getMinDate = () => {
    const minDate = isExtendDate(this.props.min);
    return minDate || this.getDefaultMinDate();
  };

  getMaxDate = () => {
    const maxDate = isExtendDate(this.props.max);
    return maxDate || this.getDefaultMaxDate();
  };

  getDefaultMinDate = () => {
    return getGregorianCalendar(1900, 0, 1, 0, 0, 0);
  };

  getDefaultMaxDate = () => {
    return getGregorianCalendar(2030, 11, 30, 23, 59, 59);
  };

  clipDate = (date) => {
    const { mode } = this.props;
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
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

  render() {
    const { prefixCls, className, onInit, defaultValue, wheelDefaultValue, ...others } = this.props;
    const { dataSource, value } = this.getColsValue();
    return (
      <PickerView
        {...others}
        className={className}
        prefixCls={prefixCls}
        dataSource={dataSource}
        value={value}
        onChange={this.onValueChange}
      />
    );
  }
}
