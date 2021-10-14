import * as React from 'react';
import classnames from 'classnames';
import { BaseCalendarProps } from './interface';
import CalendarMonthView from './Month';
import parseState from './utils/parseState';
import DateTool from '../utils/date';
import { ConfigContext } from '../n-config-provider';
import useSetState from '../utils/hooks/useSetState';

export interface CalendarProps extends BaseCalendarProps {
  prefixCls?: string;
  className?: string;
}

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
  multiple: boolean;
  [key: string]: any;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>((props, ref) => {
  const { className, dateRender, disabledDate, onChange } = props;
  const { prefixCls: globalPrefixCls, locale } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-calendar`;
  const nodes = React.useRef<Record<string, HTMLDivElement>>({});
  const [
    { value, min, max, startMonth, step, steps, refresh, ...state },
    setState,
  ] = useSetState<CalendarStates>({
    ...parseState(props),
    prevValue: [],
    step: 1,
  });

  const months = Array.from({ length: DateTool.getMonthCount(startMonth, max) }).map((_, index) =>
    DateTool.cloneDate(startMonth, 'm', index),
  );

  const handleAnchor = () => {
    const [target = new Date()] = value || [];
    const key = `${target.getFullYear()}-${target.getMonth()}`;
    const node = nodes.current[key];
    // @ts-ignore
    node?.scrollIntoViewIfNeeded?.(true);
  };

  const handleDateClick = (date: Date) => {
    if (step === 1) {
      value.splice(0, value.length);
    }
    value[step - 1] = date;
    value.sort((a: Date, b: Date) => +a - +b);
    setState({ value, step: step >= steps ? 1 : step + 1 });
    step >= steps && onChange?.(value);
  };

  const renderMonth = (month: Date) => {
    const key = `${month.getFullYear()}-${month.getMonth()}`;
    return (
      <CalendarMonthView
        prefixCls={prefixCls}
        key={key}
        min={min}
        max={max}
        value={value}
        dateMonth={month}
        dateRender={dateRender}
        disabledDate={disabledDate}
        onDateClick={handleDateClick}
        ref={(element) => {
          element && (nodes.current[key] = element);
        }}
      />
    );
  };

  React.useLayoutEffect(() => {
    handleAnchor();
  }, []);

  React.useEffect(() => {
    if (
      props.value !== state.prevValue ||
      props.multiple !== state.prevMultiple ||
      props.min !== state.prevMin ||
      props.max !== state.prevMax
    ) {
      setState({
        ...parseState(props),
        step: step ? 1 : step,
        refresh: !state.refresh,
        prevValue: props.value,
        prevMax: props.max,
        prevMin: props.min,
        prevMultiple: props.multiple,
      });
    }
  }, [props.value, props.multiple, props.min, props.max]);

  React.useEffect(() => {
    handleAnchor();
  }, [refresh]);

  return (
    <div ref={ref} className={classnames(prefixCls, className)}>
      <ul className={`${prefixCls}__bar`}>
        {locale?.Calendar?.weeks?.map((week) => (
          <li key={week} className={`${prefixCls}__bar__item`}>
            {week}
          </li>
        ))}
      </ul>
      <section className={`${prefixCls}__body`}>{months.map(renderMonth)}</section>
    </div>
  );
});

Calendar.displayName = 'CalendarView';

Calendar.defaultProps = {
  multiple: false,
  max: new Date(),
  dateRender: (date: Date) => date.getDate(),
  disabledDate: () => false,
};

export default Calendar;
