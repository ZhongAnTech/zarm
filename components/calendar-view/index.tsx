import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseCalendarViewProps } from './PropsType';

import CalendarMonthView from './Month';
import DateTool from '../utils/date';

const CN_DAY_NAME = ['日', '一', '二', '三', '四', '五', '六'];

export default class CalendarView extends PureComponent<BaseCalendarViewProps, any> {
  static defaultProps = {
    prefixCls: 'za-calendar',
    className: '',
    style: null,
    value: '',
    defaultValue: '',
    multiple: false,
    min: new Date(),
    // max: DateTool.cloneDate(new Date(), 'y', 1),
    dateRender: date => date.getDate(),
    disabledDate: date => !date,
    onChange: date => date,
  };

  static now = new Date();

  // 月份缓存数据
  static cache = {
    now: `${CalendarView.now.getFullYear()}-${CalendarView.now.getMonth()}-${CalendarView.now.getDate()}`,
  };

  constructor(props) {
    super(props);
    this.getState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps);
  }

  getState = props => {
    const state = this.state || {};
    let { value, defaultValue, multiple } = props;

    let tmpValue;
    let min;
    let max;
    let startMonth;
    let endMonth;

    value = value || defaultValue;
    value = value.constructor === Array ? value : (value && [value]) || [];

    if (JSON.stringify(value) !== JSON.stringify(state.value)) {
      // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
      // tmpValue = value.map(item => DateTool.parseDay(item));
      tmpValue = value.slice(0, multiple ? 2 : 1).map(item => DateTool.parseDay(item));
    }

    if (!DateTool.isOneDay(props.min, state.min)) {
      if(!(!props.min && state.min)){
        min = props.min ? DateTool.parseDay(props.min) : new Date();
      }
    }

    if (min || !state.startMonth) {
      startMonth = DateTool.cloneDate(min, 'dd', 1);
    }

    if (!DateTool.isOneDay(props.max, state.max)) {
      max = props.max ? DateTool.parseDay(props.max) : DateTool.cloneDate(min || state.min, 'y', 1);
      if(max === state.max) {
        max = null;
      }
    }
    if (max || !state.endMonth) {
      endMonth = DateTool.cloneDate(max, 'dd', DateTool.getDaysByDate(max));
    }

    const tmp = {
      value: tmpValue || state.value,
      min: min || state.min,
      max: max || state.max,
      startMonth: startMonth || state.startMonth,
      endMonth: endMonth || state.endMonth,
      // 是否是入参更新(主要是月份跨度更新，需要重新定位)
      md5: state.md5,
      // 注掉该逻辑，强制根据 multiple 控制节点个数，后面改进
      // steps:Math.max(tmp.value.length, tmp.defaultValue.length);
      steps: multiple ? 2 : 1,
      // 初始化点击步数
      step: !this.state ? 1 : state.step,
    };

    if(JSON.stringify(tmp) === JSON.stringify(this.state)) return;
    tmp.md5 = `${Math.floor(Math.random() * 10000)}`;

    if (!this.state) {
      this.state = tmp;
    } else {
      this.setState(tmp);
    }
  }

  // 日期点击事件，注意排序
  onDateClick = date => {
    const { step, steps, value } = this.state;
    const { onChange } = this.props;
    if (step === 1) {
      value.splice(0, value.length);
    }
    value[step - 1] = date;
    value.sort((item1, item2) => item1 - item2 > 0);

    this.setState({
      value,
      step: step >= steps ? 1 : step + 1,
    }, () => step >= steps && onChange && onChange.constructor === Function && onChange(value));
  }

  // 生成星期条
  renderWeekBar() {
    const content = CN_DAY_NAME.map(week => (
      <li key={week} className="week-bar-item">
        {week}
      </li>
    ));
    return <ul className="week-bar">{content}</ul>;
  }

  renderMonth(dateMonth) {
    const { value, md5, min, max } = this.state;
    const { dateRender, disabledDate } = this.props;
    return (
      <CalendarMonthView
        key={dateMonth.toLocaleDateString()}
        md5={md5}
        min={min}
        max={max}
        value={value}
        dateMonth={dateMonth}
        dateRender={dateRender}
        disabledDate={disabledDate}
        onDateClick={this.onDateClick}
      />
    );
  }

  // 生成日历内容
  renderMonths() {
    const { min, max } = this.state;
    const arr = Array.from({ length: DateTool.getMonthCount(min, max) });
    const content = arr.map((_item, i) => this.renderMonth(DateTool.cloneDate(min, 'm', i)));
    return (
      <section className="month-box">
        <div className="month-wrapper">{content}</div>
      </section>
    );
  }

  render() {
    const { prefixCls, className } = this.props;
    return (
      <div className={classnames(`${prefixCls}-view`, className)}>
        {this.renderWeekBar()}
        {this.renderMonths()}
      </div>
    );
  }
}
