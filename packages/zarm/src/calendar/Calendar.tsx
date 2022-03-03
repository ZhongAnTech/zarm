import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ArrowLeft, ArrowRight } from '@zarm-design/icons';
import { Transition } from 'react-transition-group';
import { BaseCalendarProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import CalendarMonthView from './Month';
import Carousel from '../carousel';
import PickerView from '../picker-view';
import parseState from './utils/parseState';
import DateTool from '../utils/date';
import Events from '../utils/events';
import throttle from '../utils/throttle';

export type CalendarProps = BaseCalendarProps & React.HTMLAttributes<HTMLElement>;

export interface CalendarStates {
  value: Date[];
  min: Date;
  max: Date;
  startMonth: Date;
  endMonth: Date;
  // 是否是入参更新(主要是月份跨度更新，需要重新定位)
  refresh: boolean;
  // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
  // steps:Math.max(tmp.value.length; tmp.defaultValue.length);
  // steps 是总的选择的个数 via zouhuan
  steps: number;
  // 初始化点击步数
  // step 是为了扩展的，以后如果是三选，四选之类的，用这个，step 标注每次事件是第几次选择 via zouhuan
  step: number;
  mode: string;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const {
    className,
    dateRender,
    disabledDate,
    onChange,
    mode,
    max: maxDate,
    min: minDate,
    direction,
    weekStartsOn,
  } = props;

  const container = (ref as any) || React.createRef<HTMLDivElement>();
  const [state, setState] = useState<CalendarStates>(() => {
    return { ...parseState(props), step: 1 };
  });

  const nodes = useRef<any>({});

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);

  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });
  const cls = bem([className]);
  const locale = globalLocal?.Calendar;

  const [scrollDate, setScrollDate] = useState<string | null>();
  const [scrolling, setScrolling] = useState(false);

  // 月历定位
  const anchor = () => {
    const { value } = state;
    const target = value[0] || new Date();
    const key = `${target.getFullYear()}-${target.getMonth()}`;
    const node = nodes.current[key]!;
    if (node && Object.prototype.toString.call(node.anchor) === '[object Function]') {
      node.anchor();
    }
  };

  const renderWeekBar = useCallback(() => {
    const weeks = [...locale!.weeks];
    if (weekStartsOn === 'Monday') {
      const item = weeks.shift();
      weeks.push(item);
    }
    const content = weeks.map((week) => (
      <li key={week} className={bem('bar__item')}>
        {week}
      </li>
    ));
    return <ul className={bem('bar')}>{content}</ul>;
  }, [weekStartsOn, locale!.weeks]);

  const handleDateClick = (date: Date) => {
    const { step, steps, value } = state;
    if (mode !== 'multiple') {
      if (step === 1) {
        value.splice(0, value.length);
      }
      value[step - 1] = date;
    } else {
      value.push(date);
    }
    value.sort((item1: Date, item2: Date) => +item1 - +item2);
    setState((prevState) => ({ ...prevState, value, step: step >= steps ? 1 : step + 1 }));

    if (step >= steps || mode === 'multiple') {
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
        mode={mode}
        value={value}
        dateMonth={dateMonth}
        weekStartsOn={weekStartsOn}
        dateRender={dateRender}
        disabledDate={disabledDate}
        onDateClick={handleDateClick}
        ref={(n) => {
          nodes.current[key] = n;
        }}
      />
    );
  };

  const scrollBodyRef = useRef(null);
  const renderMonths = () => {
    const { startMonth, max } = state;
    const arr = Array.from({ length: DateTool.getMonthCount(startMonth, max) });
    const content = arr.map((_item, i) => renderMonth(DateTool.cloneDate(startMonth, 'm', i)));
    return (
      <div className={bem('body')} ref={scrollBodyRef}>
        {content}
        <Transition in={scrolling} timeout={500}>
          {(state) => <div className={bem('scroll-title', [{ [state]: true }])}>{scrollDate}</div>}
        </Transition>
      </div>
    );
  };

  const monthList = useRef<Date[]>([]);

  const findMonthIndex = (monthArr, currentTime) => {
    let index = 0;
    for (let i = 0; i < monthArr.length; i++) {
      if (currentTime === `${monthArr[i].getFullYear()}_${monthArr[i].getMonth()}`) {
        index = i;
        break;
      }
    }
    return index;
  };
  const getCurrentMonth = () => {
    const { startMonth, max, value } = state;
    const currentTime = value[0] || new Date();
    const arr = Array.from({ length: DateTool.getMonthCount(startMonth, max) });
    const monthArr = arr.map((_item, i) => DateTool.cloneDate(startMonth, 'mm', i));
    monthList.current = monthArr;
    const currentTimeStr = `${currentTime.getFullYear()}_${currentTime.getMonth()}`;
    return findMonthIndex(monthArr, currentTimeStr);
  };

  const [currentMonth, setCurrentMonth] = useState<number>(getCurrentMonth());

  const renderSwipeMonths = () => {
    const { startMonth, max } = state;
    const arr = Array.from({ length: DateTool.getMonthCount(startMonth, max) });
    const content = arr.map((_item, i) => renderMonth(DateTool.cloneDate(startMonth, 'm', i)));
    return (
      <Carousel className={bem('body')} showPagination={false} activeIndex={currentMonth}>
        {content}
      </Carousel>
    );
  };

  const changeMonth = (index) => {
    const len = monthList.current.length;
    let currentIndex = currentMonth + index;
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    if (currentIndex > len - 1) {
      currentIndex = len - 1;
    }
    setCurrentMonth(currentIndex);
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const renderActionBar = () => {
    const dateMonth = monthList.current?.[currentMonth] || new Date();
    const year = dateMonth.getFullYear();
    const month = dateMonth.getMonth();
    const title =
      locale?.yearText === '年'
        ? year + locale.yearText + locale.months[month]
        : `${locale?.months[month]} ${year}`;
    const leftCls = bem('action-btn', [
      {
        disabled: currentMonth <= 0,
      },
    ]);
    const rightCls = bem('action-btn', [
      {
        disabled: currentMonth >= monthList.current.length - 1,
      },
    ]);
    return (
      <div className={bem('header')}>
        <div
          className={bem('title', [
            {
              animate: showDatePicker,
            },
          ])}
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          {title}
          <ArrowRight theme="primary" size="sm" />
        </div>
        <div className={bem('action')}>
          <div className={bem('action-btn')}>
            <ArrowLeft
              theme="primary"
              className={leftCls}
              onClick={() => {
                changeMonth(-1);
              }}
            />
          </div>
          <div className={bem('action-btn')}>
            <ArrowRight
              theme="primary"
              className={rightCls}
              onClick={() => {
                changeMonth(1);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const dateChange = (value) => {
    const currentTimeStr = `${value[0].value}_${value[1].value}`;
    const index = findMonthIndex(monthList.current, currentTimeStr);
    setCurrentMonth(index);
  };

  const renderDatePicker = () => {
    const monthData = monthList.current;
    const dataSource = {};
    for (let i = 0; i < monthData.length - 1; i++) {
      const year = monthData[i].getFullYear();
      const month = monthData[i].getMonth();
      if (!dataSource[year]) {
        dataSource[year] = {
          value: year,
          label: year,
          children: [
            {
              value: month,
              label: locale?.months[month],
            },
          ],
        };
      } else {
        dataSource[year].children.push({
          value: month,
          label: locale?.months[month],
        });
      }
    }
    const value = monthData[currentMonth];
    const currentValue = [value.getFullYear(), value.getMonth()];
    return showDatePicker ? (
      <PickerView
        dataSource={Object.values(dataSource)}
        value={currentValue}
        onChange={dateChange}
      />
    ) : null;
  };

  useEffect(() => {
    anchor();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (changes, obs) => {
        changes.forEach((change) => {
          if (change.intersectionRatio > 0) {
            setScrollDate(change?.target?.getAttribute('title'));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      },
    );
    Object.values(nodes?.current)?.forEach((node: any) => observer.observe(node.el()));
  }, [nodes]);

  useEffect(() => {
    if (direction !== 'horizontal') {
      setTimeout(() => {
        let timer;
        const onScroll = () => {
          setScrolling(true);
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            setScrolling(false);
          }, 800);
        };
        const throttleFn = throttle(onScroll, 150);
        scrollBodyRef?.current && Events.on(scrollBodyRef?.current, 'scroll', throttleFn);
        return () => {
          scrollBodyRef?.current && Events.off(scrollBodyRef?.current, 'scroll', throttleFn);
        };
      });
    }
  }, [direction]);

  useEffect(() => {
    setState({
      ...parseState(props),
      step: 1,
    });
  }, [mode, maxDate, minDate, direction]);

  return (
    <div className={cls} ref={container}>
      {direction === 'horizontal' ? renderActionBar() : null}
      {renderWeekBar()}
      {direction === 'horizontal' ? renderSwipeMonths() : renderMonths()}
      {direction === 'horizontal' ? renderDatePicker() : null}
    </div>
  );
});

Calendar.defaultProps = {
  mode: 'single',
  min: new Date(),
  dateRender: (date: Date) => date.getDate(),
  disabledDate: () => false,
  direction: 'vertical',
  weekStartsOn: 'Sunday',
};

export default Calendar;
