import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createBEM } from '@zarm-design/bem';
import { Transition } from 'react-transition-group';
import dayjs from 'dayjs';
import throttle from 'lodash/throttle';
import { BaseCalendarProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import CalendarMonthView from './Month';
import Week from './Week';
import Header from './Header';
import Carousel from '../carousel';
import useScroll from '../useScroll';
import parseState from './utils/parseState';
import { getElementSize } from '../utils/dom';
import type { HTMLProps } from '../utils/utilityTypes';

export interface CalendarCssVars {
  '--background'?: React.CSSProperties['background'];
  '--padding-horizontal'?: React.CSSProperties['paddingLeft'];
  '--header-height'?: React.CSSProperties['height'];
  '--week-height'?: React.CSSProperties['height'];
  '--week-font-size'?: React.CSSProperties['fontSize'];
  '--week-font-weight'?: React.CSSProperties['fontWeight'];
  '--week-background'?: React.CSSProperties['background'];
  '--week-text-color'?: React.CSSProperties['color'];
  '--month-font-size'?: React.CSSProperties['fontSize'];
  '--month-font-weight'?: React.CSSProperties['fontWeight'];
  '--month-height'?: React.CSSProperties['height'];
  '--month-scroll-background'?: React.CSSProperties['background'];
  '--day-height'?: React.CSSProperties['height'];
  '--day-font-size'?: React.CSSProperties['fontSize'];
  '--day-text-color'?: React.CSSProperties['color'];
  '--day-today-background'?: React.CSSProperties['background'];
  '--day-today-text-color'?: React.CSSProperties['color'];
  '--day-selected-background'?: React.CSSProperties['background'];
  '--day-selected-text-color'?: React.CSSProperties['color'];
  '--day-selected-shadow'?: React.CSSProperties['background'];
  '--day-range-background'?: React.CSSProperties['background'];
  '--day-range-text-color'?: React.CSSProperties['color'];
}

export type CalendarProps = BaseCalendarProps & HTMLProps<CalendarCssVars>;

interface CalendarStates {
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
    header,
  } = props;

  const container = (ref as any) || React.createRef<HTMLDivElement>();
  const { prefixCls } = useContext(ConfigContext);
  const carouselRef = useRef(null);

  const bem = createBEM('calendar', { prefixCls });
  const cls = bem([className]);

  const [state, setState] = useState<CalendarStates>(() => {
    return { ...parseState(props), step: 0 };
  });

  const { min, max, value } = state;

  const nodes = useRef<any>({});

  const scrollBodyRef = React.createRef<HTMLDivElement>();
  const weekRef = React.useRef<HTMLDivElement>();

  const [scrollDate, setScrollDate] = useState<string | null>();

  const [scrolling, setScrolling] = useState(false);

  const isHorizontal = useMemo(() => {
    return direction === 'horizontal';
  }, [direction]);

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
    if (node?.el() && scrollBodyRef.current && weekRef.current) {
      scrollIntoView.current = true;
      const top = node.el()?.offsetTop;
      const { height } = getElementSize(weekRef.current!);
      scrollBodyRef.current.scrollTop! = top - height;
    }
  };

  const handleDateClick = useCallback(
    (date: Date) => {
      const { step, steps } = state;
      const currentStep = step + 1;
      const idx = value.map(Number).indexOf(Number(date));
      if (currentStep === 1 && mode !== 'multiple') {
        value.splice(0, value.length);
      }
      if (mode === 'range') {
        value[currentStep - 1] = date;
      } else if (mode === 'multiple') {
        value.push(date);
      } else if (idx > -1) {
        value.splice(idx, 1);
      } else {
        value[currentStep - 1] = date;
      }
      value.sort((item1: Date, item2: Date) => +item1 - +item2);
      setState((prevState) => ({
        ...prevState,
        value,
        step: currentStep === steps ? 0 : currentStep,
      }));
      if ((currentStep >= steps || mode === 'multiple') && typeof onChange === 'function') {
        onChange(value);
      }
    },
    [value, mode, onChange, state],
  );

  const renderMonth = (dateMonth: Date) => {
    const key = `${dateMonth.getFullYear()}-${dateMonth.getMonth() + 1}`;
    return (
      <CalendarMonthView
        key={key}
        min={min}
        max={max}
        mode={mode}
        value={value}
        dateMonth={dateMonth}
        dateRender={dateRender}
        disabledDate={disabledDate}
        onDateClick={handleDateClick}
        ref={(n) => {
          nodes.current[key] = n;
        }}
      />
    );
  };

  const content = useMemo(() => {
    return months.map((item) => renderMonth(item));
  }, [months, min, max, disabledDate, dateRender, mode, handleDateClick, value]);

  const showHeader = useMemo(() => {
    return direction === 'horizontal' && header;
  }, [direction, header]);

  const weekNode = weekRef?.current;
  const bodyScroll = throttle(() => {
    const body = scrollBodyRef.current;
    if (!body) {
      return false;
    }
    const { scrollTop } = body as HTMLDivElement;
    let keys = Object.keys(nodes?.current);
    keys = keys.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    for (let i = 0; i < keys.length; i++) {
      const el = nodes?.current[keys[i]]?.el()! as HTMLElement;
      if (el?.offsetTop + el?.clientHeight - weekNode?.clientHeight! > scrollTop) {
        setScrollDate(el.getAttribute('title'));
        return;
      }
    }
  }, 150);

  const monthsContent = isHorizontal ? (
    <Carousel
      className={bem('body')}
      showPagination={false}
      activeIndex={currentMonth}
      onChange={setCurrentMonth}
      ref={carouselRef}
    >
      {content}
    </Carousel>
  ) : (
    <div className={bem('body')} ref={scrollBodyRef} onScroll={bodyScroll}>
      {content}
      <Transition in={scrolling} timeout={500}>
        {(tState) => <div className={bem('scroll-month', [{ [tState]: true }])}>{scrollDate}</div>}
      </Transition>
    </div>
  );

  useEffect(() => {
    !isHorizontal && anchor();
  }, [direction, minDate, maxDate]);

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
      }, 250);
    },
  });

  useEffect(() => {
    setState({
      ...parseState(props),
      step: state.step,
    });
  }, [mode, maxDate, minDate, direction]);

  return (
    <div className={cls} ref={container}>
      {showHeader && (
        <Header
          changeMonth={(idx) => {
            // @ts-ignore
            carouselRef?.current?.onSlideTo(idx)!;
          }}
          months={months}
          currentMonth={currentMonth}
        />
      )}
      <Week ref={weekRef} />
      {monthsContent}
    </div>
  );
});

Calendar.defaultProps = {
  mode: 'single',
  dateRender: (date: Date) => date.getDate(),
  disabledDate: () => false,
  direction: 'vertical',
  header: false,
};

export default Calendar;
