import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import CalendarMonthView from './Month';
import parseState from './utils/parseState';
import DateTool from '../utils/date';
import { BaseCalendarProps, CalendarStates } from './interface';

export type CalendarProps = BaseCalendarProps & React.HTMLAttributes<HTMLElement>;

const nodes = {};

const Calendar = (props: CalendarProps) => {
  const {
    className,
    dateRender,
    disabledDate,
    onChange,
    multiple,
    max: maxDate,
    min: minDate,
  } = props;

  const [state, setState] = useState<CalendarStates>(() => {
    return { ...parseState(props), step: 1 };
  });

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-calendar`;
  const cls = classnames(prefixCls, className);
  const locale = globalLocal?.Calendar;

  // 月历定位
  const anchor = () => {
    const { value } = state;
    const target = value[0] || new Date();
    const key = `${target.getFullYear()}-${target.getMonth()}`;
    const node = nodes![key];
    if (node && Object.prototype.toString.call(node.anchor) === '[object Function]') {
      node.anchor();
    }
  };

  const renderWeekBar = () => {
    const content = locale!.weeks.map((week) => (
      <li key={week} className={`${prefixCls}__bar__item`}>
        {week}
      </li>
    ));
    return <ul className={`${prefixCls}__bar`}>{content}</ul>;
  };

  const handleDateClick = (date: Date) => {
    const { step, steps, value } = state;
    if (step === 1) {
      value.splice(0, value.length);
    }
    value[step - 1] = date;
    value.sort((item1: Date, item2: Date) => +item1 - +item2);

    setState((prevState) => ({ ...prevState, value, step: step >= steps ? 1 : step + 1 }));

    if (step >= steps) {
      typeof onChange === 'function' && onChange(value);
    }
  };

  const renderMonth = (dateMonth: Date) => {
    const { value, min, max } = state;
    const key = `${dateMonth.getFullYear()}-${dateMonth.getMonth()}`;
    return (
      <CalendarMonthView
        key={key}
        min={min}
        max={max}
        value={value}
        dateMonth={dateMonth}
        dateRender={dateRender}
        disabledDate={disabledDate}
        onDateClick={handleDateClick}
        ref={(n) => {
          nodes![key] = n;
        }}
      />
    );
  };

  const renderMonths = () => {
    const { startMonth, max } = state;
    const arr = Array.from({ length: DateTool.getMonthCount(startMonth, max) });
    const content = arr.map((_item, i) => renderMonth(DateTool.cloneDate(startMonth, 'm', i)));
    return <section className={`${prefixCls}__body`}>{content}</section>;
  };

  useEffect(() => {
    anchor();
  }, []);

  useEffect(() => {
    setState({
      ...parseState(props),
      step: state.step,
    });
  }, [multiple, maxDate, minDate]);

  return (
    <div className={cls}>
      {renderWeekBar()}
      {renderMonths()}
    </div>
  );
};

Calendar.defaultProps = {
  multiple: false,
  min: new Date(),
  dateRender: (date: Date) => date.getDate(),
  disabledDate: () => false,
};

export default Calendar;
