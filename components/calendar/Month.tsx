import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { isValidElement } from 'react';

import CalendarView from './index';
import DateTool from '../utils/date';

interface CalendarMonthViewProps {
  prefixCls?: string;
  value?: Date[];
  min?: Date;
  max?: Date;
  dateMonth?: Date;
  dateRender?: (value: Date) => void;
  disabledDate?: (value: Date) => boolean;
  onDateClick?: (value: Date) => void;
}

export default class CalendarMonthView extends PureComponent<CalendarMonthViewProps, any> {
  static defaultProps = {
    prefixCls: '',
    value: [],
    dateMonth: new Date(),
    min: new Date(),
    max: new Date(),
    dateRender: date => date.getDate(),
    disabledDate: date => !date,
    onDateClick: date => date,
  };

  // 月份最小值
  private min?: any;
  // 月份最大值
  private max?: any;
  // 当前月份dom数据缓存
  private cache?: any;
  // 上次是否落点在当前月份内
  private lastIn = false;
  // 当前组件是否需要更新
  private isRefresh = true;
  // 当前月份的dom
  private node?: any;

  constructor(props) {
    super(props);
    this.min = props.min;
    this.max = props.max;
    this.state = {
      value: props.value,
      dateMonth: props.dateMonth,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.isRefresh = this.checkRefresh(nextProps);

    if (this.isRefresh) {
      this.min = nextProps.min;
      this.max = nextProps.max;
      this.setState({
        value: nextProps.value,
        dateMonth: nextProps.dateMonth,
      });
    }
  }

  anchor() {
    if (this.node && this.node.scrollIntoViewIfNeeded) {
      this.node.scrollIntoViewIfNeeded();
    }
  }

  // 检查当前是否需要更新
  checkRefresh(props) {
    const { dateMonth, value, min, max } = props;
    let isIn;
    if (!this.cache) {
      return true;
    }
    if (dateMonth - this.state.dateMonth !== 0) {
      return true;
    }
    if (min - this.min !== 0 || max - this.max !== 0) {
      return true;
    }
    if (value.length > 0) {
      const currMonth = DateTool.cloneDate(dateMonth, 'dd', 1);
      const min1 = DateTool.cloneDate(value[0], 'dd', 1);
      const max1 = DateTool.cloneDate(value[value.length - 1], 'dd', 1);
      isIn = currMonth >= min1 && currMonth <= max1;
    }
    const result = !(!isIn && !this.lastIn);
    this.lastIn = isIn;
    return result;
  }

  // 日期状态: 选中，区间
  checkStatus(date) {
    const { min, max, disabledDate } = this.props;
    const { value = [] } = this.state;
    const disabled = date < DateTool.cloneDate(min, 'd', 0) || date > DateTool.cloneDate(max, 'd', 0);
    const res = {
      disabled: disabled || (disabledDate && disabledDate(date)),
      isSelected: value.some(item => DateTool.isOneDay(date, item)),
      isRange: value.length > 1 && date > value[0] && date < value[value.length - 1],
      rangeStart: value.length > 1 && DateTool.isOneDay(date, value[0]),
      rangeEnd: value.length > 1 && DateTool.isOneDay(date, value[value.length - 1]),
    };
    this.lastIn = this.lastIn || res.isSelected || res.isRange;
    return res;
  }

  renderContent(year, month) {
    const { prefixCls, dateRender, onDateClick } = this.props;

    let data = CalendarView.cache[`${year}-${month}`];
    if (!data) {
      data = DateTool.getCurrMonthInfo(year, month);
      CalendarView.cache[`${year}-${month}`] = data;
    }

    const { firstDay, dayCount } = data;

    return Array.from({ length: dayCount }).map((_item, i) => {
      const key = i + 1;
      const date = new Date(year, month, key);
      const isToday = CalendarView.cache.now === `${year}-${month}-${key}`;
      const status = this.checkStatus(date);

      let txt = (date && dateRender && dateRender(date)) || '';
      if (typeof txt === 'object') {
        if (!isValidElement(txt)) {
          console.error('dateRender函数返回数据类型错误，请返回基本数据类型或者reactNode');
          txt = '';
        }
      }

      const className = {
        d6: (key + firstDay) % 7 === 0,
        d7: (key + firstDay) % 7 === 1,
        disabled: status.disabled,
        today: isToday,
        selected: status.isSelected,
        range: status.isRange,
        'range-start': status.rangeStart,
        'range-end': status.rangeEnd,
        [`firstday-${firstDay}`]: i === 0 && firstDay,
      };

      return (
        <li
          key={`${year}-${month}-${key}`}
          className={classnames(`${prefixCls}-day-item`, className)}
          onClick={() => !status.disabled && date && onDateClick && onDateClick(date)}
        >
          {(txt && <div className={`${prefixCls}-day-detail`}>{txt}</div>) || ''}
        </li>
      );
    });
  }

  render() {
    const { prefixCls } = this.props;
    const { dateMonth } = this.state;

    const year = dateMonth.getFullYear();
    const month = dateMonth.getMonth();

    if (!this.isRefresh) {
      return this.cache;
    }

    this.isRefresh = false;
    const monthkey = `${year}-${month}`;

    this.cache = (
      <section
        key={monthkey}
        className={`${prefixCls}-month-content`}
        title={`${year}年${month + 1}月`}
        ref={n => (this.node = n)}
      >
        <ul>{this.renderContent(year, month)}</ul>
      </section>
    );

    return this.cache;
  }
}
