import React, {
  useContext,
  forwardRef,
  isValidElement,
  useRef,
  useImperativeHandle,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { createBEM } from '@zarm-design/bem';
import dayjs from 'dayjs';
import { ConfigContext } from '../n-config-provider';
import useTitle from './useTitle';
import { BaseCalendarMonthProps } from './interface';

export type CalendarMonthProps = BaseCalendarMonthProps & React.HTMLAttributes<HTMLElement>;

const CalendarMonthView = forwardRef<any, CalendarMonthProps>((props, ref) => {
  const {
    dateRender,
    min,
    max,
    disabledDate,
    onDateClick,
    dateMonth,
    value,
    mode,
    weekStartsOn,
  } = props;

  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);

  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });

  const monthRef = useRef<any>();

  const isDisabled = useCallback(
    (date) => {
      return (
        dayjs(date).isBefore(dayjs(min)) ||
        dayjs(date).isAfter(dayjs(max)) ||
        (typeof disabledDate === 'function' && disabledDate(date))
      );
    },
    [min, max],
  );

  const isSelected = useCallback(
    (date) => {
      const currentDate = dayjs(date);
      return mode === 'single'
        ? currentDate.isSame(dayjs(value[0]), 'day')
        : value.some((item) => currentDate.isSame(dayjs(item), 'day'));
    },
    [mode, value],
  );

  const range = useCallback(
    (date) => {
      if (mode !== 'range') {
        return '';
      }
      const currentDate = dayjs(date);
      const start = value[0];
      const end = value[value.length - 1];
      if (currentDate.isAfter(dayjs(start)) && currentDate.isBefore(dayjs(end))) {
        return bem('day', [{ range: true }]);
      }
      if (value.length > 1) {
        if (currentDate.isSame(dayjs(start), 'day')) {
          return 'range-start';
        }
        if (currentDate.isSame(dayjs(end), 'day')) {
          return 'range-end';
        }
      }
      return '';
    },
    [mode, value],
  );

  const hanlerDateClick = useCallback(
    (date) => {
      if (!isDisabled(date) && typeof onDateClick === 'function') {
        onDateClick(date);
      }
    },
    [onDateClick],
  );

  const renderDay = (day: number, year: number, month: number, firstDay: number): ReactNode => {
    const date = new Date(year, month, day);
    const isToday = dayjs().isSame(dayjs(date), 'day');

    let text: string | ReactNode = '';
    if (typeof dateRender === 'function') {
      text = dateRender(date);
      if (typeof text === 'object' && !isValidElement(text)) {
        console.warn('dateRender函数返回数据类型错误，请返回基本数据类型或者reactNode');
        text = '';
      }
    }

    const baseClassName = classnames(
      {
        d6: (day + firstDay) % 7 === 0,
        d7: (day + firstDay) % 7 === 1,
        [`firstday-${firstDay}`]: day === 1 && firstDay,
      },
      bem('day'),
    );

    const className = bem('day', [
      {
        disabled: isDisabled(date),
        today: isToday,
        selected: isSelected(date),
      },
    ]);
    return (
      <li
        key={`${year}-${month}-${day}`}
        className={`${baseClassName} ${className} ${range(date)}`}
        onClick={() => hanlerDateClick(date)}
      >
        {(text && <div className={bem('day__content')}>{text}</div>) || ''}
      </li>
    );
  };

  const renderDays = (year: number, month: number): ReactNode[] => {
    const date = dayjs().year(year).month(month).date(1);
    const daysInMonth = date.daysInMonth();
    const firstDay = date.day();
    const days: ReactNode[] = [];
    let i = 1;
    while (i <= daysInMonth) {
      days.push(renderDay(i, year, month, weekStartsOn === 'Sunday' ? firstDay : firstDay - 1));
      i += 1;
    }
    return days;
  };

  useImperativeHandle(ref, () => {
    return {
      anchor: () => {
        if (monthRef?.current?.scrollIntoViewIfNeeded) {
          monthRef.current.scrollIntoView();
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

  const title = useTitle(dateMonth);

  return (
    <div key={monthKey} className={bem('month')} title={title} ref={monthRef}>
      <ul>{renderDays(year, month)}</ul>
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
