import React, { PureComponent } from 'react';
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
    step: 1,
    min: 0,
    max: 100,
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

  onDragMove = (event, { offsetX }) => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }

    event.preventDefault();

    let offset = this.offsetStart + offsetX;
    if (offset < 0) {
      offset = 0;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        offset,
        value: newValue,
      });
      return false;
    }

    if (offset > this.maxOffset()) {
      offset = this.maxOffset();
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

  onDragEnd = (_event, { offsetX }) => {
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

  render() {
    const { prefixCls, className, disabled, min, max } = this.props;
    const { value, offset, tooltip } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <div className={cls}>
        <div className={`${prefixCls}__line`} ref={(ele) => { this.line = ele; }}>
          <div className={`${prefixCls}__line__bg`} style={{ width: offset }} />
        </div>
        <Drag
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}
        >
          <div
            className={`${prefixCls}__handle`}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={{ left: offset }}
          >
            <Tooltip visible={tooltip} title={value}>
              <div className={`${prefixCls}-handle-shadow`} />
            </Tooltip>
          </div>
        </Drag>
      </div>
    );
  }
}
