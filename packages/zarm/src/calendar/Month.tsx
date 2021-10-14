import * as React from 'react';
import classnames from 'classnames';
import { BaseCalendarMonthProps } from './interface';
import DateTool from '../utils/date';
import { isPlainObject } from '../utils/validate';
import { ConfigContext } from '../n-config-provider';

export interface CalendarMonthProps extends BaseCalendarMonthProps {
  prefixCls?: string;
}

const CalendarMonthView = React.forwardRef<HTMLDivElement, CalendarMonthProps>((props, ref) => {
  const { min, max, dateRender, disabledDate, onDateClick } = props;
  const { prefixCls: globalPrefixCls, locale } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-calendar`;

  // 上次是否落点在当前月份内
  const lastIn = React.useRef(false);

  const [value, setValue] = React.useState(props.value);

  const [dateMonth, setDateMonth] = React.useState(props.dateMonth);

  React.useEffect(() => {
    value !== props.value && setValue(props.value);
    dateMonth !== props.dateMonth && setDateMonth(props.dateMonth);
  }, [props.value, props.dateMonth]);

  const checkStatus = (date: Date) => {
    const disabled =
      date < DateTool.cloneDate(min, 'd', 0) || date > DateTool.cloneDate(max, 'd', 0);
    const status = {
      disabled: disabled || (disabledDate && disabledDate(date)),
      isSelected: value.some((item) => DateTool.isOneDay(date, item)),
      isRange: value.length > 1 && date > value[0] && date < value[value.length - 1],
      rangeStart: value.length > 1 && DateTool.isOneDay(date, value[0]),
      rangeEnd: value.length > 1 && DateTool.isOneDay(date, value[value.length - 1]),
    };
    lastIn.current = lastIn.current || status.isSelected || status.isRange;

    return status;
  };

  const renderDay = (day: number, year: number, month: number, firstDay: number) => {
    const date = new Date(year, month, day);
    const isToday =
      new Date().getFullYear() === year &&
      new Date().getMonth() === month &&
      new Date().getDate() === day;

    const status = checkStatus(date);

    let element = (date && dateRender?.(date)) || '';

    if (isPlainObject(element) && !React.isValidElement(element)) {
      element = '';
    }

    const classes = {
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
        className={classnames(`${prefixCls}__day`, classes)}
        onClick={() => !status.disabled && !!date && onDateClick?.(date)}
      >
        {!!element && <div className={`${prefixCls}__day__content`}>{element}</div>}
      </li>
    );
  };

  const year = dateMonth.getFullYear();
  const month = dateMonth.getMonth();
  const monthKey = `${year}-${month}`;

  const { firstDay, dayCount } = DateTool.getCurrMonthInfo(year, month);

  const title =
    locale?.Calendar?.yearText === '年'
      ? year + locale?.Calendar?.yearText + locale?.Calendar?.months[month]
      : `${locale?.Calendar?.months[month]} ${year}`;

  return (
    <section ref={ref} key={monthKey} className={`${prefixCls}__month`} title={title}>
      <ul>
        {Array.from({ length: dayCount }).map((_, index) =>
          renderDay(index + 1, year, month, firstDay),
        )}
      </ul>
    </section>
  );
});

CalendarMonthView.displayName = 'CalendarMonthView';

CalendarMonthView.defaultProps = {
  value: [],
  dateMonth: new Date(),
  min: new Date(),
  max: new Date(),
  dateRender: (date: Date) => date.getDate(),
  disabledDate: () => false,
};

export default CalendarMonthView;
