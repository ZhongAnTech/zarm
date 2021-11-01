/* eslint-disable operator-linebreak */
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCalendarProps } from './PropsType';
import CalendarMonthView from './Month';
import parseState from './utils/parseState';
import DateTool from '../utils/date';

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
}

export default class CalendarView extends PureComponent<CalendarProps, CalendarStates> {
  static displayName = 'CalendarView';

  static defaultProps: CalendarProps = {
    prefixCls: 'za-calendar',
    multiple: false,
    min: new Date(),
    dateRender: (date: Date) => date.getDate(),
    disabledDate: () => false,
  };

  // 当前月份dom数据缓存
  private nodes?: object;

  constructor(props: CalendarProps) {
    super(props);
    this.nodes = {};
  }

  state = {
    ...parseState(this.props),
    step: 1,
  };

  componentDidMount() {
    this.anchor();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      ('value' in nextProps && nextProps.value !== prevState.prevValue) ||
      ('multiple' in nextProps && nextProps.multiple !== prevState.prevMultiple) ||
      ('min' in nextProps && nextProps.min !== prevState.prevMin) ||
      ('max' in nextProps && nextProps.max !== prevState.prevMax)
    ) {
      return {
        ...parseState(nextProps),
        step: prevState.step ? 1 : prevState.step,
        refresh: !prevState.refresh,
        prevValue: nextProps.value,
        prevMax: nextProps.max,
        prevMin: nextProps.min,
        prevMultiple: nextProps.multiple,
      };
    }
    return null;
  }

  componentDidUpdate(_prevProps: CalendarProps, prevState: CalendarStates) {
    const { refresh } = this.state;
    if (refresh !== prevState.refresh) {
      this.anchor();
    }
  }

  // 日期点击事件，注意排序
  handleDateClick = (date: Date) => {
    const { step, steps, value } = this.state;
    const { onChange } = this.props;
    if (step === 1) {
      value.splice(0, value.length);
    }
    value[step - 1] = date;
    value.sort((item1: Date, item2: Date) => +item1 - +item2);
    this.setState(
      {
        value,
        step: step >= steps ? 1 : step + 1,
      },
      () => {
        step >= steps && typeof onChange === 'function' && onChange(value);
      },
    );
  };

  // 月历定位
  anchor = () => {
    const { value } = this.state;
    const target = value[0] || new Date();
    const key = `${target.getFullYear()}-${target.getMonth()}`;
    const node = this.nodes![key];
    if (node && Object.prototype.toString.call(node.anchor) === '[object Function]') {
      node.anchor();
    }
  };

  // 生成星期条
  renderWeekBar = () => {
    const { prefixCls, locale } = this.props;
    const content = locale!.weeks.map((week) => (
      <li key={week} className={`${prefixCls}__bar__item`}>
        {week}
      </li>
    ));
    return <ul className={`${prefixCls}__bar`}>{content}</ul>;
  };

  renderMonth = (dateMonth: Date) => {
    const { value, min, max } = this.state;
    const { prefixCls, dateRender, disabledDate } = this.props;
    const key = `${dateMonth.getFullYear()}-${dateMonth.getMonth()}`;
    return (
      <CalendarMonthView
        prefixCls={prefixCls}
        key={key}
        min={min}
        max={max}
        value={value}
        dateMonth={dateMonth}
        dateRender={dateRender}
        disabledDate={disabledDate}
        onDateClick={this.handleDateClick}
        ref={(n) => {
          this.nodes![key] = n;
        }}
      />
    );
  };

  // 生成日历内容
  renderMonths() {
    const { prefixCls } = this.props;
    const { startMonth, max } = this.state;
    const arr = Array.from({ length: DateTool.getMonthCount(startMonth, max) });
    const content = arr.map((_item, i) => this.renderMonth(DateTool.cloneDate(startMonth, 'm', i)));
    return <section className={`${prefixCls}__body`}>{content}</section>;
  }

  render() {
    const { prefixCls, className } = this.props;
    return (
      <div className={classnames(prefixCls, className)}>
        {this.renderWeekBar()}
        {this.renderMonths()}
      </div>
    );
  }
}
