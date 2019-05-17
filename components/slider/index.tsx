import React, { Fragment, PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Events from '../utils/events';
import Drag from '../drag';
import Tooltip from '../tooltip';

const getValue = (props, defaultValue) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  return defaultValue;
};

export interface SliderProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Slider extends PureComponent<SliderProps, any> {
  static defaultProps = {
    prefixCls: 'za-slider',
    disabled: false,
    showMark: false,
    step: 1,
    min: 0,
    max: 100,
    marks: {},
  };

  private line;

  private offsetStart: number = 0;

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, 0),
      offset: 0,
      tooltip: false,
    };
  }

  componentDidMount() {
    this.init();
    Events.on(window, 'resize', this.init);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      const offset = this.getOffsetByValue(value);
      this.setState({ value, offset });
    }
  }

  onDragStart = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setState({ tooltip: true });
  };

  onDragMove = (event, { offsetX = 0 } = {}) => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }

    event.stopPropagation();
    event.preventDefault();

    let offset = (this.offsetStart || 0) + (offsetX || 0);

    if (offset < 0) {
      offset = 0;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        offset,
        value: newValue,
      });
      return false;
    }

    const maxOffset = this.maxOffset();
    if (offset > maxOffset) {
      offset = maxOffset;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        offset,
        value: newValue,
      });
      return false;
    }

    const value = this.getValueByOffset(offset);
    offset = this.getOffsetByValue(value);
    this.setState({ offset, value });
    return true;
  };

  onDragEnd = (_event, { offsetX = 0 } = {}) => {
    this.setState({ tooltip: false });
    if (Number.isNaN(offsetX)) {
      return;
    }

    this.offsetStart += offsetX;

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(this.state.value);
    }
  };

  /**
   * 通过偏移量确定值
   * @param  {number} offset 偏移量
   * @return {number}        值
   */
  getValueByOffset = (offset) => {
    const { min, max, step } = this.props;
    const percent = offset / this.maxOffset();
    const value = Math.round((min + ((max - min) * percent)) / step) * step;
    return Math.max(Math.min(value, max), min);
  };

  /**
   * 通过值获取偏移量
   * @param  {number} value 值
   * @return {number}       偏移量
   */
  getOffsetByValue = (value) => {
    const { min, max } = this.props;
    return this.maxOffset() * ((value - min) / (max - min));
  };

  /**
   * 获取最大偏移量
   */
  maxOffset = () => {
    return this.line
      ? this.line.offsetWidth
      : 0;
  };

  /**
   * 初始化
   */
  init = () => {
    const { value } = this.state;
    const offset = this.getOffsetByValue(value);
    this.offsetStart = offset;
    this.setState({ offset });
  };

  /**
   * 获取标签
   * @param {object} marks 标签对象
   * @param {number} value 滑动输入条值
   * @param {string} prefixCls
   */
  renderMarkInfo = (marks, value, prefixCls) => {
    // 判断是否为空对象
    if (typeof marks !== 'object' || JSON.stringify(marks) === '{}') {
      return null;
    }

    const markKeys = Object.keys(marks || {});

    const markElement = markKeys.map((item) => {
      return (
        <span
          key={item}
          className={`${prefixCls}__mark`}
          style={{ left: `${item}%` }}
        >
          {marks[item]}
        </span>
      );
    });

    const marksElement = (
      <div className={`${prefixCls}__marks`}>
        {markElement}
      </div>
    );

    const lineDot = markKeys.map((item) => {
      const dotStyle = classnames(`${prefixCls}__line__dot`, {
        [`${prefixCls}__line__dot-active`]: value >= item,
      });

      return (
        <span key={item} className={dotStyle} style={{ left: `${item}%` }} />
      );
    });

    return (
      <Fragment>
        {lineDot}

        {marksElement}
      </Fragment>
    );
  };

  render() {
    const {
      prefixCls,
      className,
      disabled,
      min,
      max,
      showMark: showLimit,
      marks = {},
    } = this.props;

    const {
      value,
      offset = 0,
      tooltip,
    } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
    });

    const content = (
      <div className={`${prefixCls}__content`}>
        <div className={`${prefixCls}__line`} ref={(ele) => { this.line = ele; }}>
          <div className={`${prefixCls}__line__bg`} style={{ width: offset || 0 }} />

          {this.renderMarkInfo(marks, value, prefixCls)}
        </div>

        <Drag
          onDragStart={this.onDragStart}
          onDragMove={(event, state) => this.onDragMove(event, state)}
          onDragEnd={this.onDragEnd}
        >
          <div
            className={`${prefixCls}__handle`}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{ left: offset || 0 }}
          >
            <Tooltip visible={tooltip} title={value}>
              <div className={`${prefixCls}-handle-shadow`} />
            </Tooltip>
          </div>
        </Drag>
      </div>
    );

    // 判断展示区间
    const contentWrapper = showLimit
      ? (
        <Fragment>
          <div className={`${prefixCls}__limit`}>
            {min}
          </div>

          {content}

          <div className={`${prefixCls}__limit`}>
            {max}
          </div>
        </Fragment>
      )
      : content;

    return (
      <div className={cls}>
        {contentWrapper}
      </div>
    );
  }
}
