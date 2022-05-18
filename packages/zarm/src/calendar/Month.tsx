import React, {
  useContext,
  forwardRef,
  isValidElement,
  useRef,
  useImperativeHandle,
  ReactNode,
  useCallback,
} from 'react';
import { createBEM } from '@zarm-design/bem';
import dayjs from 'dayjs';
import { ConfigContext } from '../n-config-provider';
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
  } = props;

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);

  const weekStartsOn = globalLocal?.Calendar.weekStartsOn;

  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });

  const monthRef = useRef<any>();

  const isDisabled = useCallback(
    (date) => {
      return (
        dayjs(date).isBefore(dayjs(min), 'day') ||
        dayjs(date).isAfter(dayjs(max), 'day') ||
        (typeof disabledDate === 'function' && disabledDate(date))
      );
    },
    [min, max, disabledDate],
  );

  const isSelected = useCallback(
    (date) => {
      const currentDate = dayjs(date);
      return mode === 'single'
        ? value[0] && currentDate.isSame(dayjs(value[0]), 'day')
        : value.some((item) => (item ? currentDate.isSame(dayjs(item), 'day') : false));
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
        return 'range';
      }
      if (value.length > 1 && !dayjs(start).isSame(dayjs(end))) {
        if (currentDate.isSame(dayjs(start), 'day') && start) {
          return 'start';
        }
        if (currentDate.isSame(dayjs(end), 'day') && end) {
          return 'end';
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
    const dayjsDate = dayjs(date);
    const isToday = dayjs().isSame(dayjsDate, 'day');

    let text: string | ReactNode = '';
    if (typeof dateRender === 'function') {
      text = dateRender(date);
      if (typeof text === 'object' && !isValidElement(text)) {
        console.warn('dateRender函数返回数据类型错误，请返回基本数据类型或者reactNode');
        text = '';
      }
    }

    const style =
      day === 1
        ? {
            marginLeft: `${14.28571 * firstDay}%`,
          }
        : {};

    const rangeStatus = range(date);
    const className = bem('day', [
      {
        disabled: isDisabled(date),
        today: isToday,
        selected: isSelected(date),
        range: rangeStatus === 'range',
        d6: (day + firstDay) % 7 === 0 && !!rangeStatus,
        d7: (day + firstDay) % 7 === 1 && !!rangeStatus,
        start: rangeStatus === 'start',
        end: rangeStatus === 'end',
        last: rangeStatus === 'end' && (day === 1 || (day + firstDay) % 7 === 1),
        first:
          rangeStatus === 'start' &&
          (dayjsDate.daysInMonth() === day || (day + firstDay) % 7 === 0),
      },
    ]);

    return (
      <li
        key={`${year}-${month}-${day}`}
        className={className}
        style={style}
        onClick={() => hanlerDateClick(date)}
      >
        {(text && <div className={bem('day__content')}>{text}</div>) || ''}
      </li>
    );
  };

  const renderDays = (year: number, month: number): ReactNode[] => {
    const date = dayjs().year(year).month(month).date(1);
    const daysInMonth = date.daysInMonth();
    let firstDay = date.day();
    if (weekStartsOn !== 'Sunday') {
      firstDay = firstDay === 0 ? firstDay + 6 : firstDay - 1;
    }
    const days: ReactNode[] = [];
    let i = 1;
    while (i <= daysInMonth) {
      days.push(renderDay(i, year, month, firstDay));
      i += 1;
    }
    return days;
  };

  useImperativeHandle(ref, () => {
    return {
      el: () => {
        return monthRef.current;
      },
    };
  });

  const year = dateMonth.getFullYear();
  const month = dateMonth.getMonth();
  const monthKey = `${year}-${month}`;
  const title = dayjs().year(year).month(month).format(globalLocal?.Calendar?.yearMonthFormat);

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
