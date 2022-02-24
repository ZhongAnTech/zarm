import React, { useContext, forwardRef, isValidElement, useRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import DateTool from '../utils/date';
import { BaseCalendarMonthProps } from './interface';

export type CalendarMonthProps = BaseCalendarMonthProps & React.HTMLAttributes<HTMLElement>;

const CalendarMonthView = forwardRef<any, CalendarMonthProps>((props, ref) => {
  const { dateRender, min, max, disabledDate, onDateClick, dateMonth, value, selectMode } = props;

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);

  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });
  const lastIn = useRef(false);
  // const cls = classnames(prefixCls, className);
  const locale = globalLocal?.Calendar;

  const monthRef = useRef<any>();

  // 日期状态: 选中，区间
  const checkStatus = (date: Date) => {
    const disabled =
      date < DateTool.cloneDate(min, 'd', 0) || date > DateTool.cloneDate(max, 'd', 0);
    const res = {
      disabled: disabled || (disabledDate && disabledDate(date)),
      isSelected:
        selectMode !== 'single'
          ? value.some((item) => DateTool.isOneDay(date, item))
          : DateTool.isOneDay(date, value[0]),
      isRange:
        value.length > 1 &&
        date > value[0] &&
        date < value[value.length - 1] &&
        selectMode === 'range',
      rangeStart: value.length > 1 && DateTool.isOneDay(date, value[0]) && selectMode === 'range',
      rangeEnd:
        value.length > 1 &&
        DateTool.isOneDay(date, value[value.length - 1]) &&
        selectMode === 'range',
    };

    lastIn.current = lastIn.current || res.isSelected || res.isRange;
    return res;
  };

  const renderDay = (day: number, year: number, month: number, firstDay: number) => {
    const date = new Date(year, month, day);
    const isToday =
      new Date().getFullYear() === year &&
      new Date().getMonth() === month &&
      new Date().getDate() === day;
    const status = checkStatus(date);

    let txt = (date && dateRender && dateRender(date)) || '';
    if (typeof txt === 'object') {
      if (!isValidElement(txt)) {
        console.warn('dateRender函数返回数据类型错误，请返回基本数据类型或者reactNode');
        txt = '';
      }
    }

    const baseClassName = classnames(
      {
        d6: (day + firstDay) % 7 === 0,
        d7: (day + firstDay) % 7 === 1,
        'range-start': status.rangeStart,
        'range-end': status.rangeEnd,
        [`firstday-${firstDay}`]: day === 1 && firstDay,
      },
      bem('day'),
    );

    const className = bem('day', [
      {
        disabled: status.disabled,
        today: isToday,
        selected: status.isSelected,
        range: status.isRange,
      },
    ]);
    return (
      <li
        key={`${year}-${month}-${day}`}
        className={`${baseClassName} ${className}`}
        onClick={() => !status.disabled && date && onDateClick && onDateClick(date)}
      >
        {(txt && <div className={bem('day__content')}>{txt}</div>) || ''}
      </li>
    );
  };

  const renderContent = (year: number, month: number) => {
    const data = DateTool.getCurrMonthInfo(year, month);
    const { firstDay, dayCount } = data;
    return Array.from({ length: dayCount }).map((_item, i) =>
      renderDay(i + 1, year, month, firstDay),
    );
  };

  useImperativeHandle(ref, () => {
    return {
      anchor: () => {
        if (monthRef?.current?.scrollIntoViewIfNeeded) {
          monthRef.current.scrollIntoViewIfNeeded();
        }
      },
      el: () => {
        return monthRef.current;
      },
    };
  });

  const year = dateMonth.getFullYear();
  const month = dateMonth.getMonth();
  const monthKey = `${year}-${month}`;

  const title =
    locale?.yearText === '年'
      ? year + locale.yearText + locale.months[month]
      : `${locale?.months[month]} ${year}`;

  return (
    <div key={monthKey} className={bem('month')} title={title} ref={monthRef}>
      <ul>{renderContent(year, month)}</ul>
    </div>
  );
});

CalendarMonthView.defaultProps = {
  value: [],
  dateMonth: new Date(),
  min: new Date(),
  max: new Date(),
  dateRender: (date: Date) => date.getDate(),
  disabledDate: () => false,
};

export default CalendarMonthView;
