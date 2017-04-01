import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import MultiPicker from './MultiPicker';
import moment from 'moment';
import { formatFn } from './utils';
import defaultLocale from './locale/zh_CN';

function getDaysInMonth(now) {
  return now.clone().endOf('month').date();
}

function pad(n) {
  return n < 10 ? `0${n}` : n + '';
}

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';


class DatePicker extends Component {

  constructor(props) {
    super(props);

    let date = props.date && this.isExtendMoment(props.date);
    let defaultDate = props.defaultDate && this.isExtendMoment(props.defaultDate);

    this.initDate = props.date && this.isExtendMoment(props.date);

    this.state = {
      visible: props.visible || false,
      date: date || defaultDate,
    };
  }

  componentWillReceiveProps(nextProps) {
    let date = nextProps.date && this.isExtendMoment(nextProps.date);
    let defaultDate = nextProps.defaultDate && this.isExtendMoment(nextProps.defaultDate);

    this.setState({
      date: date || defaultDate
    });
  }

  isExtendMoment(date) {
    const { mode } = this.props;
    if (date instanceof moment) {
      return date;
    } else {
      return mode === TIME ? moment(date, 'HH:mm Z') : moment(date, 'YYYY-MM-DD HH:mm Z');
    }
  }

  onMaskClick() {
    this.setState({ visible: false });
  }

  render() {
    const { value, cols } = this.getValueCols();
    const { mode, prefixCls, pickerPrefixCls, rootNativeProps, className, cancelText, okText, title, placeholder } = this.props;

    const classes = classnames({
      'ui-picker-container' : true,
      'ui-picker-hidden'    : !this.state.visible,
      [className]           : !!className,
    });

    const inputCls = classnames({
      'ui-picker-placeholder': !this.state.date
    });

    return (
      <div className="ui-picker-group" onClick={() => this.toggle()}>
        <div className={inputCls}>
          {this.state.date ? formatFn(this, this.state.date) : placeholder}
        </div>
        <div className={classes} onClick={(e) => this.onContainerClick(e)}>
          <div className="ui-picker-mask" onClick={this.onMaskClick.bind(this)}></div>
          <div className="ui-picker-inner">
            <div className="ui-picker-header">
              <div className="ui-picker-cancel" onClick={() => this.onCancel()}>{cancelText}</div>
              <div className="ui-picker-title">{title}</div>
              <div className="ui-picker-submit" onClick={() => this.onOk()}>{okText}</div>
            </div>
            <div className="ui-picker-mask-top">
              <div className="ui-picker-mask-bottom">
              <MultiPicker
                rootNativeProps={rootNativeProps}
                className={className}
                prefixCls={prefixCls}
                pickerPrefixCls={pickerPrefixCls}
                pickerItemStyle={typeof window === 'undefined' && mode === 'datetime' ? smallPickerItem : undefined}
                selectedValue={value}
                onValueChange={this.onValueChange.bind(this)}
              >
                {cols}
              </MultiPicker>
              </div>
            </div>
          </div>
        </div>
      </div> );
  }

  //  获取
  getValueCols() {
    const { mode } = this.props;
    const date = this.getDate();

    let cols = [];
    let value = [];

    if (mode === YEAR) {
      return {
        cols: this.getDateData(),
        value: [date.year() + ''],
      };
    }

    if (mode === MONTH) {
      return {
        cols: this.getDateData(),
        value: [date.year() + '', date.month() + ''],
      };
    }

    if (mode === DATETIME || mode === DATE) {
      cols = this.getDateData();
      value = [date.year() + '', date.month() + '', date.date() + ''];
    }

    if (mode === DATETIME || mode === TIME) {
      cols = cols.concat(this.getTimeData());
      value = value.concat([date.hour() + '', date.minute() + '']);
    }

    return {
      value,
      cols,
    };
  }

  getDefaultMinDate() {
    if (!this.defaultMinDate) {
      this.defaultMinDate = this.getGregorianCalendar([2000, 0, 1, 0, 0, 0]);
    }
    return this.defaultMinDate;
  }

  getDefaultMaxDate() {
    if (!this.defaultMaxDate) {
      this.defaultMaxDate = this.getGregorianCalendar([2030, 1, 1, 23, 59, 59]);
    }
    return this.defaultMaxDate;
  }

  getDate() {
    return this.state.date || moment(new Date());
  }

  getMinYear() {

    return this.getMinDate().year();
  }

  getMaxYear() {
    return this.getMaxDate().year();
  }

  getMinMonth() {
    return this.getMinDate().month();
  }

  getMaxMonth() {
    return this.getMaxDate().month();
  }

  getMinDay() {
    return this.getMinDate().date();
  }

  getMaxDay() {
    return this.getMaxDate().date();
  }

  getMinHour() {
    return this.getMinDate().hour();
  }

  getMaxHour() {
    return this.getMaxDate().hour();
  }

  getMinMinute() {
    return this.getMinDate().minute();
  }

  getMaxMinute() {
    return this.getMaxDate().minute();
  }

  getMinDate() {
    let minDate = this.props.minDate && this.isExtendMoment(this.props.minDate);
    return minDate || this.getDefaultMinDate();
  }


  getMaxDate() {
    let maxDate = this.props.maxDate && this.isExtendMoment(this.props.maxDate);
    return maxDate || this.getDefaultMaxDate();
  }

  getDateData() {
    const { locale, formatMonth, formatDay, mode } = this.props;
    const date = this.getDate();

    const selYear = date.year();
    const selMonth = date.month();
    const minDateYear = this.getMinYear();
    const maxDateYear = this.getMaxYear();
    const minDateMonth = this.getMinMonth();
    const maxDateMonth = this.getMaxMonth();
    const minDateDay = this.getMinDay();
    const maxDateDay = this.getMaxDay();
    const years = [];

    for (let i = minDateYear; i <= maxDateYear; i++) {
      years.push({
        value: i + '',
        label: i + locale.year + '',
      });
    }

    const yearCol = { key: 'year', props: { children: years } };
    if (mode === YEAR) {
      return [ yearCol ];
    }

    const months = [];
    let minMonth = 0;
    let maxMonth = 11;
    if (minDateYear === selYear) {
      minMonth = minDateMonth;
    }
    if (maxDateYear === selYear) {
      maxMonth = maxDateMonth;
    }
    for (let i = minMonth; i <= maxMonth; i++) {
      const label = formatMonth ? formatMonth(i, date) : (i + 1 + locale.month + '');
      months.push({
        value: i + '',
        label,
      });
    }
    const monthCol = { key: 'month', props: { children: months } };
    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    const days = [];
    let minDay = 1;
    let maxDay = getDaysInMonth(date);

    if (minDateYear === selYear && minDateMonth === selMonth) {
      minDay = minDateDay;
    }
    if (maxDateYear === selYear && maxDateMonth === selMonth) {
      maxDay = maxDateDay;
    }
    for (let i = minDay; i <= maxDay; i++) {
      const label = formatDay ? formatDay(i, date) : (i + locale.day + '');
      days.push({
        value: i + '',
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
    const { mode, locale, minuteStep } = this.props;
    const date = this.getDate();
    const minDateMinute = this.getMinMinute();
    const maxDateMinute = this.getMaxMinute();
    const minDateHour = this.getMinHour();
    const maxDateHour = this.getMaxHour();
    const hour = date.hour();


    if (mode === DATETIME) {
      const year = date.year();
      const month = date.month();
      const day = date.date();
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

    const hours = [];
    for (let i = minHour; i <= maxHour; i++) {
      hours.push({
        value: i + '',
        label: locale.hour ? i + locale.hour + '' : pad(i),
      });
    }

    const minutes = [];


    for (let i = minMinute; i <= maxMinute; i += minuteStep) {
      minutes.push({
        value: i + '',
        label: locale.minute ? i + locale.minute + '' : pad(i),
      });
    }

    return [
      { key: 'hours', props: { children: hours } },
      { key: 'minutes', props: { children: minutes } },
    ];
  }

  getGregorianCalendar(arg) {
    return moment(arg);
  }

  onValueChange(values, index) {
    const value = parseInt(values[index], 10);

    const props = this.props;
    const { mode } = props;
    let newValue = this.getDate().clone();

    if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
      switch (index) {
        case 0:
          newValue.year(value);
          break;
        case 1:
          newValue.month(value);
          break;
        case 2:
          newValue.date(value);
          break;
        case 3:
          newValue.hour(value);
          break;
        case 4:
          newValue.minute(value);
          break;
        default:
          break;
      }
    } else {
      switch (index) {
        case 0:
          newValue.hour(value);
          break;
        case 1:
          newValue.minute(value);
          break;
        default:
          break;
      }
    }

    newValue = this.clipDate(newValue);

    // ???
    if (!('date' in props)) {
      this.setState({
        date: newValue,
      });
    }

    props.onChange(newValue);
  }

  clipDate(date) {
    const { mode } = this.props;
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();
    if (mode === DATETIME) {
      if (date.isBefore(minDate)) {
        return minDate.clone();
      }
      if (date.isAfter(maxDate)) {
        return maxDate.clone();
      }
    } else if (mode === DATE) {
      if (date.isBefore(minDate, 'day')) {
        return minDate.clone();
      }
      if (date.isAfter(maxDate, 'day')) {
        return maxDate.clone();
      }
    } else {
      const maxHour = maxDate.hour();
      const maxMinutes = maxDate.minute();
      const minHour = minDate.hour();
      const minMinutes = minDate.minute();
      const hour = date.hour();
      const minutes = date.minute();
      if (hour < minHour || hour === minHour && minutes < minMinutes) {
        return minDate.clone();
      }
      if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
        return maxDate.clone();
      }
    }
    return date;
  }

  // 阻止选择器区域的默认事件
  onContainerClick(e) {
    e.stopPropagation();
  }

  // 切换显示状态
  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onCancel() {
    const { onCancel } = this.props;
    this.toggle();
    this.setState({
      date: this.initDate
    });
    onCancel && onCancel();
  }

  onOk() {
    const { onOk } = this.props;
    const value = this.getDate();
    this.initDate = value;
    this.toggle();
    onOk && onOk(value);
  }

}

DatePicker.propTypes = {
  visible         : PropTypes.bool,
  title           : PropTypes.string,
  cancelText      : PropTypes.string,
  okText          : PropTypes.string,
  mode            : PropTypes.string,
  onMaskClick     : PropTypes.func,
  prefixCls       : PropTypes.string,
  pickerPrefixCls : PropTypes.string

};

DatePicker.defaultProps = {
  visible         : false,
  cancelText      : '取消',
  okText          : '确定',
  mode            : DATE,
  onMaskClick     : () => {},
  locale          : defaultLocale,
  minuteStep      : 1,
  prefixCls       : 'ui-multi-picker',
  pickerPrefixCls : 'ui-datepicker',
};

export default DatePicker;
