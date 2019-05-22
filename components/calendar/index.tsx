import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCalendarProps } from './PropsType';
import CalendarMonthView from './Month';
import DateTool from '../utils/date';

const CN_DAY_NAME = ['日', '一', '二', '三', '四', '五', '六'];

export interface CalendarProps extends BaseCalendarProps {
  prefixCls?: string;
  className?: string;
}

export default class CalendarView extends PureComponent<CalendarProps, any> {
  static defaultProps = {
    prefixCls: 'za-calendar',
    multiple: false,
    min: new Date(),
    dateRender: date => date.getDate(),
    disabledDate: () => false,
  };

  static now = new Date();

  // 月份缓存数据
  static cache = {
    now: `${CalendarView.now.getFullYear()}-${CalendarView.now.getMonth()}-${CalendarView.now.getDate()}`,
  };

  // 当前月份dom数据缓存
  private nodes?: object;

  constructor(props) {
    super(props);
    this.nodes = {};
    this.getState(props);
  }

  componentDidMount() {
    this.anchor();
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  componentDidUpdate(_prevProps, prevState) {
    const { refresh } = this.state;
    if (refresh !== prevState.refresh) {
      this.anchor();
    }
  }

  getState = (props) => {
    const state = this.state || {};
    const { defaultValue, multiple } = props;
    let { value } = props;
    let tmpValue;
    let min;
    let max;
    let startMonth;
    let endMonth;

    value = value || defaultValue;
    value = Object.prototype.toString.call(value) === '[object Array]'
      ? value
      : (value && [value]) || [];

    if (
      JSON.stringify(value) !== JSON.stringify(state.value)
      || multiple !== state.multiple
    ) {
      // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
      // tmpValue = value.map(item => DateTool.parseDay(item));
      tmpValue = value
        .slice(0, multiple ? 2 : 1)
        .map(item => DateTool.parseDay(item));
      // 排序过滤
      tmpValue = tmpValue.sort((item1, item2) => item1 - item2);
    }

    if (!DateTool.isOneDay(props.min, state.min)) {
      if (!(!props.min && state.min)) {
        min = props.min ? DateTool.parseDay(props.min) : new Date();
      }
    }

    if (min || !state.startMonth) {
      startMonth = DateTool.cloneDate(min, 'dd', 1);
    }

    if (!DateTool.isOneDay(props.max, state.max)) {
      max = props.max
        ? DateTool.parseDay(props.max)
        : DateTool.cloneDate(min || state.min, 'y', 1);
      if (max === state.max) {
        max = null;
      }
    }
    if (max || !state.endMonth) {
      endMonth = DateTool.cloneDate(max, 'dd', DateTool.getDaysByDate(max));
    }

    // min、max 排序
    const duration = [min || state.min, max || state.max].sort(
      (item1, item2) => item1 - item2,
    );

    const tmp = {
      value: tmpValue || state.value,
      min: duration[0],
      max: duration[1],
      startMonth: startMonth || state.startMonth,
      endMonth: endMonth || state.endMonth,
      // 是否是入参更新(主要是月份跨度更新，需要重新定位)
      refresh: state.refresh,
      // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
      // steps:Math.max(tmp.value.length, tmp.defaultValue.length);
      steps: multiple ? 2 : 1,
      // 初始化点击步数
      step: !this.state ? 1 : state.step,
    };

    if (JSON.stringify(tmp) === JSON.stringify(this.state)) {
      return;
    }

    tmp.refresh = !state.refresh;

    if (!this.state) {
      this.state = tmp;
    } else {
      this.setState(tmp);
    }
  };

  // 日期点击事件，注意排序
  onDateClick = (date) => {
    const { step, steps, value } = this.state;
    const { onChange } = this.props;
    if (step === 1) {
      value.splice(0, value.length);
    }
    value[step - 1] = date;
    value.sort((item1, item2) => item1 - item2);

    this.setState(
      {
        value,
        step: step >= steps ? 1 : step + 1,
      },
      () => step >= steps && typeof onChange === 'function' && onChange(value),
    );
  };

  // 月历定位
  anchor = () => {
    const { value } = this.state;
    const target = value[0] || CalendarView.now;
    const key = `${target.getFullYear()}-${target.getMonth()}`;
    const node = this.nodes![key];
    if (node && Object.prototype.toString.call(node.anchor) === '[object Function]') {
      node.anchor();
    }
  };

  // 生成星期条
  renderWeekBar = () => {
    const { prefixCls } = this.props;
    const content = CN_DAY_NAME.map(week => (
      <li key={week} className={`${prefixCls}__bar__item`}>
        {week}
      </li>
    ));
    return <ul className={`${prefixCls}__bar`}>{content}</ul>;
  };

  renderMonth = (dateMonth) => {
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
        onDateClick={this.onDateClick}
        ref={(n) => { this.nodes![key] = n; }}
      />
    );
  };

  // 生成日历内容
  renderMonths() {
    const { prefixCls } = this.props;
    const { min, max } = this.state;
    const arr = Array.from({ length: DateTool.getMonthCount(min, max) });
    const content = arr.map((_item, i) => this.renderMonth(DateTool.cloneDate(min, 'm', i)));
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
