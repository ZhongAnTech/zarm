import React, { Component } from 'react';
import PropsType from './PropsType';
import defaultLocale from './locale/zh_CN';
import Wheel from '../Wheel';

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;

// 获取当月天数
function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// 补齐格式
function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function cloneDate(date) {
  return new Date(+date);
}

// 设置月份
function setMonth(date, month) {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
}

// 转成Date格式
function getGregorianCalendar(arg) {
  return new Date(...arg);
}

function isExtendDate(date) {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
}

export interface DatePickerViewProps extends PropsType {
  prefixCls?: string;
  className?: any;
}

export default class DatePickerView extends Component<DatePickerViewProps, any> {

  static defaultProps = {
    visible: true,
    placeholder: '请选择',
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    mode: DATE,
    disabled: false,
    value: '',
    defaultValue: '',
    locale: defaultLocale,
    minuteStep: 1,
    prefixCls: 'za-picker',
    valueMember: 'value',
    onClick: () => {},
    onCancel: () => {},
  };

  private defaultMinDate;
  private defaultMaxDate;

  constructor(props) {
    super(props);

    const date = props.value && isExtendDate(props.value);
    const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);
    const display = props.wheelDefaultValue && isExtendDate(props.wheelDefaultValue);

    this.state = {
      visible: false,
      date: defaultDate || date,
      display,
    };
  }

  componentWillReceiveProps(nextProps) {
    const date = nextProps.value && isExtendDate(nextProps.value);
    const defaultDate = nextProps.defaultValue && isExtendDate(nextProps.defaultValue);

    this.setState({
      date: date || defaultDate,
    });
  }

  onValueChange(values, index) {
    const value = parseInt(values[index], 10);

    const { mode, onValueChange, onChange } = this.props;
    let newValue = cloneDate(this.getDate());

    if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
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
          this.setHours(newValue, value);
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
          this.setHours(newValue, value);
          break;
        case 1:
          newValue.setMinutes(value);
          break;
        default:
          break;
      }
    }

    newValue = this.clipDate(newValue);

    if (!('date' in this.props)) {
      this.setState({
        date: newValue,
      });
    }
    // props.onChange(formatFn(this, newValue));
    if (typeof onValueChange === 'function') {
      onValueChange(newValue);
    }

    if (typeof onChange === 'function') {
      if (this.state.date) {
        onChange(newValue);
      }
    }
  }

  setHours(date, hour) {
    // if (this.props.use12Hours) {
    // const dh = date.getHours();
    // let nhour = hour;
    // nhour = dh >= 12 ? hour + 12 : hour;
    // nhour = nhour >= 24 ? 0 : nhour; // Make sure no more than one day
    // date.setHours(nhour);
    // } else {
      date.setHours(hour);
    // }
  }

  getDefaultMinDate() {
    if (!this.defaultMinDate) {
      this.defaultMinDate = getGregorianCalendar([2000, 0, 1, 0, 0, 0]);
    }
    return this.defaultMinDate;
  }

  getDefaultMaxDate() {
    if (!this.defaultMaxDate) {
      this.defaultMaxDate = getGregorianCalendar([2030, 11, 30, 23, 59, 59]);
    }
    return this.defaultMaxDate;
  }

  getDefaultDate() {
    // 存在最小值且毫秒数大于现在
    if (this.props.min && Date.parse(this.getMinDate()) >= Date.now()) {
      return this.getMinDate();
    }
    return new Date();
  }

  getDate() {
    return this.state.date || this.state.display || this.getDefaultDate();
  }

  getMinYear() {
    return this.getMinDate().getFullYear();
  }

  getMaxYear() {
    return this.getMaxDate().getFullYear();
  }

  getMinMonth() {
    return this.getMinDate().getMonth();
  }

  getMaxMonth() {
    return this.getMaxDate().getMonth();
  }

  getMinDay() {
    return this.getMinDate().getDate();
  }

  getMaxDay() {
    return this.getMaxDate().getDate();
  }

  getMinHour() {
    return this.getMinDate().getHours();
  }

  getMaxHour() {
    return this.getMaxDate().getHours();
  }

  getMinMinute() {
    return this.getMinDate().getMinutes();
  }

  getMaxMinute() {
    return this.getMaxDate().getMinutes();
  }

  getMinDate() {
    const minDate = isExtendDate(this.props.min);
    return minDate || this.getDefaultMinDate();
  }

  getMaxDate() {
    const maxDate = isExtendDate(this.props.max);
    return maxDate || this.getDefaultMaxDate();
  }

  getDateData() {
    const { locale, formatYear, formatMonth, formatDay, mode } = this.props;
    const date = this.getDate();

    const selYear = date.getFullYear();
    const selMonth = date.getMonth();
    const minDateYear = this.getMinYear();
    const maxDateYear = this.getMaxYear();
    const minDateMonth = this.getMinMonth();
    const maxDateMonth = this.getMaxMonth();
    const minDateDay = this.getMinDay();
    const maxDateDay = this.getMaxDay();
    const years: object[] = [];

    for (let i = minDateYear; i <= maxDateYear; i += 1) {
      const label = formatYear ? formatYear(i) : `${i + locale.year}`;
      years.push({
        value: `${i}`,
        label,
      });
    }

    const yearCol = { key: 'year', props: { children: years } };
    if (mode === YEAR) {
      return [yearCol];
    }

    const months: object[] = [];
    let minMonth = 0;
    let maxMonth = 11;

    if (minDateYear === selYear) {
      minMonth = minDateMonth;
    }
    if (maxDateYear === selYear) {
      maxMonth = maxDateMonth;
    }
    for (let i = minMonth; i <= maxMonth; i += 1) {
      const label = formatMonth ? formatMonth(i) : `${i + 1 + locale.month}`;
      months.push({
        value: `${i}`,
        label,
      });
    }
    const monthCol = { key: 'month', props: { children: months } };
    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    const days: object[] = [];
    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (minDateYear === selYear && minDateMonth === selMonth) {
      minDay = minDateDay;
    }
    if (maxDateYear === selYear && maxDateMonth === selMonth) {
      maxDay = maxDateDay;
    }

    for (let i = minDay; i <= maxDay; i += 1) {
      const label = formatDay ? formatDay(i) : `${i + locale.day}`;
      days.push({
        value: `${i}`,
        label,
      });
    }
    return [
      yearCol,
      monthCol,
      { key: 'day', props: { children: days } },
    ];
  }

  getTimeData() {
    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;
    const { mode, locale, formatHour, formatMinute, minuteStep = DatePickerView.defaultProps.minuteStep } = this.props;
    const date = this.getDate();

    const minDateMinute = this.getMinMinute();
    const maxDateMinute = this.getMaxMinute();
    const minDateHour = this.getMinHour();
    const maxDateHour = this.getMaxHour();
    const hour = date.getHours();

    if (mode === DATETIME) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      const minDateYear = this.getMinYear();
      const maxDateYear = this.getMaxYear();
      const minDateMonth = this.getMinMonth();
      const maxDateMonth = this.getMaxMonth();
      const minDateDay = this.getMinDay();
      const maxDateDay = this.getMaxDay();

      if (minDateYear === year && minDateMonth === month && minDateDay === day) {
        minHour = minDateHour;
        if (minDateHour === hour) {
          minMinute = minDateMinute;
        }
      }
      if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
        maxHour = maxDateHour;
        if (maxDateHour === hour) {
          maxMinute = maxDateMinute;
        }
      }
    } else {
      minHour = minDateHour;
      if (minDateHour === hour) {
        minMinute = minDateMinute;
      }
      maxHour = maxDateHour;
      if (maxDateHour === hour) {
        maxMinute = maxDateMinute;
      }
    }

    const hours: object[] = [];
    for (let i = minHour; i <= maxHour; i += 1) {
      let label = '';
      if (formatHour) {
        label = formatHour(i);
      } else {
        label = locale.hour ? `${i + locale.hour}` : pad(i);
      }

      hours.push({
        value: `${i}`,
        label,
      });
    }

    const minutes: object[] = [];

    for (let i = minMinute; i <= maxMinute; i += minuteStep) {
      let label = '';
      if (formatMinute) {
        label = formatMinute(i);
      } else {
        label = locale.minute ? `${i + locale.minute}` : pad(i);
      }
      minutes.push({
        value: `${i}`,
        label,
      });
    }

    return [
      { key: 'hours', props: { children: hours } },
      { key: 'minutes', props: { children: minutes } },
    ];
  }

  // 获取
  getValueCols() {
    const { mode } = this.props;
    const date = this.getDate();

    let cols: any[] = [];
    let value: any[] = [];

    if (mode === YEAR) {
      return {
        cols: this.getDateData(),
        value: [`${date.getFullYear()}`],
      };
    }

    if (mode === MONTH) {
      return {
        cols: this.getDateData(),
        value: [`${date.getFullYear()}`, `${date.getMonth()}`],
      };
    }

    if (mode === DATETIME || mode === DATE) {
      cols = this.getDateData();
      value = [`${date.getFullYear()}`, `${date.getMonth()}`, `${date.getDate()}`];
    }

    if (mode === DATETIME || mode === TIME) {
      cols = cols.concat(this.getTimeData());
      value = value.concat([`${date.getHours()}`, `${date.getMinutes()}`]);
    }

    return {
      value,
      cols,
    };
  }

  clipDate(date) {
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
    } else if (mode === DATE) {
      if (+date + ONE_DAY <= minDate) {
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
  }

  // 切换显示状态
  toggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  render() {
    const { value, cols } = this.getValueCols();
    const { prefixCls, className, disabled, valueMember, visible } = this.props;

    return visible
    ? (
      <div className={`${prefixCls}-mask-top`}>
        <div className={`${prefixCls}-mask-bottom`}>
          <Wheel.Group
            className={className}
            disabled={disabled}
            valueMember={valueMember}
            selectedValue={value}
            onValueChange={(values, index) => this.onValueChange(values, index)}
          >
            {cols}
          </Wheel.Group>
        </div>
      </div>
    )
    : null;
  }
}
