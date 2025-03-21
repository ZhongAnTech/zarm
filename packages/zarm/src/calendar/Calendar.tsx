import { createBEM } from '@zarm-design/bem';
import dayjs from 'dayjs';
import throttle from 'lodash/throttle';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import Carousel from '../carousel';
import { ConfigContext } from '../config-provider';
import useScroll from '../use-scroll';
import type { HTMLProps } from '../utils/utilityTypes';
import Header from './Header';
import { BaseCalendarProps } from './interface';
import CalendarMonthView from './Month';
import parseState from './utils/parseState';
import Week from './Week';

export interface CalendarCssVars {
  '--background'?: React.CSSProperties['background'];
  '--padding-horizontal'?: React.CSSProperties['paddingLeft'];
  '--padding-vertical'?: React.CSSProperties['paddingTop'];
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
  '--day-width'?: React.CSSProperties['width'];
  '--day-margin-vertical'?: React.CSSProperties['marginTop'];
  '--day-font-size'?: React.CSSProperties['fontSize'];
  '--day-text-color'?: React.CSSProperties['color'];
  '--day-today-background'?: React.CSSProperties['background'];
  '--day-today-text-color'?: React.CSSProperties['color'];
  '--day-selected-border-radius'?: React.CSSProperties['borderRadius'];
  '--day-selected-background'?: React.CSSProperties['background'];
  '--day-selected-text-color'?: React.CSSProperties['color'];
  '--day-selected-shadow'?: React.CSSProperties['background'];
  '--day-range-background'?: React.CSSProperties['background'];
  '--day-range-text-color'?: React.CSSProperties['color'];
  '--action-btn-disabled'?: React.CSSProperties['color'];
}

export type CalendarProps = BaseCalendarProps & HTMLProps<CalendarCssVars>;

interface CalendarStates {
  value: Date[];
  // min: Date;
  // max: Date;
  // 是否是入参更新(主要是月份跨度更新，需要重新定位)
  // refresh: boolean;
  // // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
  // // steps:Math.max(tmp.value.length; tmp.defaultValue.length);
  // // steps 是总的选择的个数 via zouhuan
  // steps: number;
  // 初始化点击步数
  // step 是为了扩展的，以后如果是三选，四选之类的，用这个，step 标注每次事件是第几次选择 via zouhuan
  step?: number;
  // mode: string;
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

  const [min, max] = useMemo(() => {
    const minDay = minDate ? dayjs(minDate).toDate() : dayjs().toDate();
    const maxDay = maxDate ? dayjs(maxDate).toDate() : dayjs().add(1, 'year').toDate();
    const duration = [minDay, maxDay].sort((item1: Date, item2: Date) => +item1 - +item2);
    return duration;
  }, [maxDate, minDate]);

  const steps = useMemo(() => {
    return mode === 'range' ? 2 : 1;
  }, [mode]);

  const { value } = state;

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
    const dateMax = dayjs(max);
    const dateMin = dayjs(min);
    const len = (dateMax.year() - dateMin.year()) * 12 + dateMax.month() - dateMin.month();
    let i = 0;
    do {
      month.push(dayjs(min).add(i, 'month').toDate());
      i += 1;
    } while (i <= len);
    return month;
  }, [max, min]);

  const currentMonthIndex = useMemo(() => {
    const currentTime = dayjs(value[0] || new Date());
    return months.findIndex((current) => {
      return dayjs(current).isSame(currentTime, 'month');
    });
  }, [value]);

  const [currentMonth, setCurrentMonth] = useState<number>(currentMonthIndex);

  // 月历定位
  const scrollIntoView = useRef(false);
  const anchor = () => {
    const target = value[0] || new Date();
    const key = `${target.getFullYear()}-${target.getMonth() + 1}`;
    const node = nodes.current[key]!;
    node?.el()?.scrollIntoView?.();
  };

  const handleDateClick = useCallback(
    (date: Date) => {
      const { step } = state;
      const currentStep = step + 1;
      const idx = value.map(Number).indexOf(Number(date));
      if (currentStep === 1 && mode !== 'multiple') {
        value.splice(0, value.length);
      }
      if (mode === 'range') {
        value[currentStep - 1] = date;
      } else if (idx > -1) {
        value.splice(idx, 1);
      } else if (mode === 'multiple') {
        value.push(date);
      } else {
        value[currentStep - 1] = date;
      }
      value.sort((item1: Date, item2: Date) => +item1 - +item2);

      setState((prevState) => ({
        ...prevState,
        value,
        step: currentStep === steps ? 0 : currentStep,
      }));
      // if ((currentStep >= steps || mode === 'multiple') && typeof onChange === 'function') {
      //   onChange(value);
      // }
      if (typeof onChange === 'function') {
        onChange(value);
      }
    },
    [mode, state, value, onChange],
  );

  const renderMonth = useCallback(
    (dateMonth: Date) => {
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
    },
    [min, max, mode, value, dateRender, disabledDate, handleDateClick, nodes],
  );

  const content = useMemo(() => {
    return months.map((item) => renderMonth(item));
  }, [renderMonth]);

  const showHeader = useMemo(() => {
    return direction === 'horizontal' && header;
  }, [direction, header]);

  const bodyScroll = throttle(() => {
    const weekNode = weekRef?.current;
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

  const monthsContent = useMemo(() => {
    if (isHorizontal) {
      return (
        <Carousel
          className={bem('body')}
          showPagination={false}
          activeIndex={currentMonth}
          onChange={setCurrentMonth}
          ref={carouselRef}
        >
          {content}
        </Carousel>
      );
    }
    return (
      <div className={bem('body')} ref={scrollBodyRef} onScroll={bodyScroll}>
        {content}
        <Transition in={scrolling} timeout={500}>
          {(tState) => (
            <div className={bem('scroll-month', [{ [tState]: true }])}>{scrollDate}</div>
          )}
        </Transition>
      </div>
    );
  }, [mode, currentMonth, content, isHorizontal, scrollDate, scrolling]);

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
