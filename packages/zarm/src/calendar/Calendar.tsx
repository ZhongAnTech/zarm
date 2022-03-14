import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import { Transition } from 'react-transition-group';
import dayjs from 'dayjs';
import { BaseCalendarProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import CalendarMonthView from './Month';
import Week from './Week';
import Header from './Header';
import Carousel from '../carousel';
import useScroll from '../useScroll';
import parseState from './utils/parseState';
import { isFunction } from '../utils/validate';

export type CalendarProps = BaseCalendarProps & React.HTMLAttributes<HTMLElement>;

export interface CalendarStates {
  value: Date[];
  min: Date;
  max: Date;
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
  const { prefixCls: globalPrefixCls } = useContext(ConfigContext);

  const bem = createBEM('calendar', { prefixCls: globalPrefixCls });
  const cls = bem([className]);

  const [state, setState] = useState<CalendarStates>(() => {
    return { ...parseState(props), step: 1 };
  });

  const { min, max, value } = state;

  const nodes = useRef<any>({});

  const scrollBodyRef = React.createRef<HTMLDivElement>();

  const [scrollDate, setScrollDate] = useState<string | null>();

  const [scrolling, setScrolling] = useState(false);

  const isHorizontal = () => {
    return direction === 'horizontal';
  };

  const months = useMemo(() => {
    const month: Date[] = [];
    const len = dayjs(max).diff(min, 'month');
    let i = 0;
    do {
      month.push(dayjs(min).add(i, 'month').toDate());
      i += 1;
    } while (i <= len);
    return month;
  }, [state.max, state.min]);

  const currentMonthIndex = useMemo(() => {
    const currentTime = dayjs(value[0] || new Date());
    return months.findIndex((current) => {
      return dayjs(current).isSame(currentTime, 'month');
    });
  }, [state.value]);

  const [currentMonth, setCurrentMonth] = useState<number>(currentMonthIndex);

  // 月历定位
  const scrollIntoView = useRef(false);
  const anchor = () => {
    const target = value[0] || new Date();
    const key = `${target.getFullYear()}-${target.getMonth()}`;
    const node = nodes.current[key]!;
    if (node && isFunction(node.anchor)) {
      scrollIntoView.current = true;
      node.anchor();
    }
  };

  const handleDateClick = (date: Date) => {
    const { step, steps } = state;
    if (mode === 'multiple') {
      value.push(date);
    } else {
      if (step === 1) {
        value.splice(0, value.length);
      }
      value[step - 1] = date;
    }
    value.sort((item1: Date, item2: Date) => +item1 - +item2);
    setState((prevState) => ({ ...prevState, value, step: step >= steps ? 1 : step + 1 }));

    if ((step >= steps || mode === 'multiple') && typeof onChange === 'function') {
      onChange(value);
    }
  };

  const renderMonth = (dateMonth: Date) => {
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

  const renderMonths = () => {
    const content = months.map((item) => renderMonth(item));
    if (isHorizontal()) {
      return (
        <Carousel
          className={bem('body')}
          showPagination={false}
          activeIndex={currentMonth}
          onChange={setCurrentMonth}
        >
          {content}
        </Carousel>
      );
    }
    return (
      <div className={bem('body')} ref={scrollBodyRef}>
        {content}
        <Transition in={scrolling} timeout={500}>
          {(tState) => (
            <div className={bem('scroll-title', [{ [tState]: true }])}>{scrollDate}</div>
          )}
        </Transition>
      </div>
    );
  };

  useEffect(() => {
    anchor();
  }, []);

  const timer = useRef<ReturnType<typeof setTimeout>>();
  useScroll({
    container: scrollBodyRef,
    onScroll: () => {
      !scrollIntoView.current && setScrolling(true);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setScrolling(false);
        scrollIntoView.current = false;
      }, 800);
    },
  });

  useEffect(() => {
    let observer;
    if (window?.IntersectionObserver) {
      observer = new IntersectionObserver(
        (changes) => {
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
    }
    return () => {
      window?.IntersectionObserver && observer.disconnect();
    };
  }, [nodes]);

  useEffect(() => {
    setState({
      ...parseState(props),
      step: 1,
    });
  }, [mode, maxDate, minDate, direction]);

  return (
    <div className={cls} ref={container}>
      <Header
        changeMonth={setCurrentMonth}
        direction={direction!}
        months={months}
        currentMonth={currentMonth}
      />
      <Week weekStartsOn={weekStartsOn!} />
      {renderMonths()}
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
