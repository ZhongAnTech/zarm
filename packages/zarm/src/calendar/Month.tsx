import React, { Component, isValidElement } from 'react';
import classnames from 'classnames';
import { BaseCalendarMonthProps } from './PropsType';
import DateTool from '../utils/date';
import ConfigReceiver from '../config-receiver';

export interface CalendarMonthProps extends BaseCalendarMonthProps {
  prefixCls?: string;
}

export interface CalendarMonthState {
  value: Date[];
  dateMonth: Date;
}

class CalendarMonthView extends Component<CalendarMonthProps, CalendarMonthState> {
  static displayName = 'CalendarMonthView';

  static defaultProps = {
    prefixCls: 'za-calendar',
    value: [],
    dateMonth: new Date(),
    min: new Date(),
    max: new Date(),
    dateRender: (date: Date) => date.getDate(),
    disabledDate: () => false,
  };

  // 上次是否落点在当前月份内
  private lastIn?: boolean = false;

  // 当前月份的dom
  private node?: any;

  constructor(props: CalendarMonthProps) {
    super(props);
    this.state = {
      value: props.value,
      dateMonth: props.dateMonth,
    };
    this.checkStatus = this.checkStatus.bind(this);
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (
      // eslint-disable-next-line operator-linebreak
      ('value' in nextProps && nextProps.value !== state.value) ||
      ('dateMonth' in nextProps && nextProps.dateMonth !== state.dateMonth)
    ) {
      return {
        value: nextProps.value,
        dateMonth: nextProps.dateMonth,
      };
    }
    return null;
  }

  anchor = () => {
    if (this.node && this.node.scrollIntoViewIfNeeded) {
      this.node.scrollIntoViewIfNeeded();
    }
  };

  // 日期状态: 选中，区间
  checkStatus(date: Date) {
    const { min, max, disabledDate } = this.props;
    const { value = [] } = this.state;
    const disabled =
      date < DateTool.cloneDate(min, 'd', 0) || date > DateTool.cloneDate(max, 'd', 0);
    const res = {
      disabled: disabled || (disabledDate && disabledDate(date)),
      isSelected: value.some((item) => DateTool.isOneDay(date, item)),
      isRange: value.length > 1 && date > value[0] && date < value[value.length - 1],
      rangeStart: value.length > 1 && DateTool.isOneDay(date, value[0]),
      rangeEnd: value.length > 1 && DateTool.isOneDay(date, value[value.length - 1]),
    };
    this.lastIn = this.lastIn || res.isSelected || res.isRange;
    return res;
  }

  renderDay = (day: number, year: number, month: number, firstDay: number) => {
    const { prefixCls, dateRender, onDateClick } = this.props;
    const date = new Date(year, month, day);
    const isToday =
      new Date().getFullYear() === year &&
      new Date().getMonth() === month &&
      new Date().getDate() === day;
    const status = this.checkStatus(date);

    let txt = (date && dateRender && dateRender(date)) || '';
    if (typeof txt === 'object') {
      if (!isValidElement(txt)) {
        console.warn('dateRender函数返回数据类型错误，请返回基本数据类型或者reactNode');
        txt = '';
      }
    }

    const className = {
      d6: (day + firstDay) % 7 === 0,
      d7: (day + firstDay) % 7 === 1,
      [`${prefixCls}__day--disabled`]: status.disabled,
      [`${prefixCls}__day--today`]: isToday,
      [`${prefixCls}__day--selected`]: status.isSelected,
      [`${prefixCls}__day--range`]: status.isRange,
      'range-start': status.rangeStart,
      'range-end': status.rangeEnd,
      [`firstday-${firstDay}`]: day === 1 && firstDay,
    };

    return (
      <li
        key={`${year}-${month}-${day}`}
        className={classnames(`${prefixCls}__day`, className)}
        onClick={() => !status.disabled && date && onDateClick && onDateClick(date)}
      >
        {(txt && <div className={`${prefixCls}__day__content`}>{txt}</div>) || ''}
      </li>
    );
  };

  renderContent = (year: number, month: number) => {
    const data = DateTool.getCurrMonthInfo(year, month);
    const { firstDay, dayCount } = data;
    return Array.from({ length: dayCount }).map((_item, i) =>
      this.renderDay(i + 1, year, month, firstDay),
    );
  };

  render() {
    const { prefixCls, locale } = this.props;
    const { dateMonth } = this.state;

    const year = dateMonth.getFullYear();
    const month = dateMonth.getMonth();
    const monthKey = `${year}-${month}`;

    const title =
      locale?.yearText === '年'
        ? year + locale.yearText + locale.months[month]
        : `${locale?.months[month]} ${year}`;

    return (
      <section
        key={monthKey}
        className={`${prefixCls}__month`}
        title={title}
        ref={(n) => {
          this.node = n;
        }}
      >
        <ul>{this.renderContent(year, month)}</ul>
      </section>
    );
  }
}

export default ConfigReceiver('Calendar')(CalendarMonthView);
