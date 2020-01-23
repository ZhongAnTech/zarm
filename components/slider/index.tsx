import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

import Events from '../utils/events';
import Drag, { DragEvent, DragState } from '../drag';
import Tooltip from '../tooltip';

const getValue = (props: Slider['props'], defaultValue: number) => {
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue || defaultValue;
  }
  return defaultValue;
};

function preventDefault(event: MouseEvent) {
  event.preventDefault();
}

function getPrecision(step: number) {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

function getClosestPoint(val: number, { marks, step, min, max }: Pick<SliderProps, 'marks' | 'step' | 'min' | 'max'>) {
  const points = Object.keys(marks || {}).map(parseFloat);
  if (step !== null) {
    const maxSteps = Math.floor((max - min) / step);
    const steps = Math.min((val - min) / step, maxSteps);
    const closestStep = Math.round(steps) * step + min;
    points.push(closestStep);
  }
  const diffs = points.map((point) => Math.abs(val - point));

  return points[diffs.indexOf(Math.min(...diffs))];
}

function ensureValuePrecision(val: number, props: SliderProps) {
  const { step } = props;
  const closestPoint = Number.isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0;
  return step === null
    ? closestPoint
    : parseFloat(closestPoint.toFixed(getPrecision(step)));
}


export interface SliderProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface SliderStates {
  value: number;
  prevPropsValue: number;
  tooltip: boolean;
}

export default class Slider extends PureComponent<SliderProps, SliderStates> {
  private line: HTMLDivElement | null = null;

  private container: HTMLDivElement | null = null;

  private offsetStart = 0;

  static defaultProps = {
    prefixCls: 'za-slider',
    disabled: false,
    showMark: false,
    vertical: false,
    step: 1,
    min: 0,
    max: 100,
    marks: {},
  };

  state: SliderStates = {
    value: getValue(this.props, 0),
    prevPropsValue: getValue(this.props, 0),
    tooltip: false,
  };

  componentDidMount() {
    this.init();
    Events.on(window, 'resize', this.init);
  }

  static getDerivedStateFromProps(nextProps: SliderProps, prevState: SliderStates) {
    const { value } = nextProps;

    if (
      typeof value !== 'undefined'
      && value !== prevState.prevPropsValue
    ) {
      return {
        ...prevState,
        value,
        prevPropsValue: value,
      };
    }

    return null;
  }

  /**
   * 初始化
   */
  init = () => {
    const { value } = this.state;
    this.offsetStart = this.getOffsetByValue(value);
  };

  /**
   * 通过偏移量确定值
   * @param  {number} offset 偏移量
   * @return {number}        值
   */
  getValueByOffset = (offset: number) => {
    const {
      min = 0,
      max,
      vertical,
    } = this.props;

    const percent = offset / this.getMaxOffset();

    const value = vertical
      ? (1 - percent) * (max - min) + min
      : Math.round((min + ((max - min) * percent)));

    return ensureValuePrecision(value, this.props);
  };

  /**
   * 获取偏移量百分比
   * @param value
   */
  getOffsetPercent = (value: number) => {
    const { min, max } = this.props;
    const ratio = (value - min) / (max - min);
    return `${ratio * 100}%`;
  };

  /**
   * 通过值获取偏移量
   * @param  {number} value 值
   * @return {number}       偏移量
   */
  getOffsetByValue = (value: number) => {
    const {
      vertical,
      min,
      max,
    } = this.props;

    const maxOffset = this.getMaxOffset();
    const range = max - min;

    return vertical
      ? maxOffset * ((max - value) / (range))
      : maxOffset * ((value - min) / (range));
  };

  /**
   * 获取最大偏移量
   */
  getMaxOffset = () => {
    if (this.line) {
      if (this.props.vertical) {
        return this.line.offsetHeight;
      }

      return this.line.offsetWidth;
    }

    return 0;
  };

  handleDragStart = () => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setState({ tooltip: true });
  };

  handleDragMove = (event?: DragEvent, dragState?: DragState) => {
    const {
      disabled,
      vertical,
    } = this.props;

    if (disabled) {
      return false;
    }

    Tooltip.updateAll();
    event!.stopPropagation();
    event!.preventDefault();

    const { offsetX, offsetY } = dragState!;
    let offset = vertical
      ? (this.offsetStart) + (offsetY || 0)
      : (this.offsetStart || 0) + (offsetX || 0);

    if (offset < 0) {
      offset = 0;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        value: newValue,
      });
      return false;
    }

    const maxOffset = this.getMaxOffset();
    if (offset > maxOffset) {
      offset = maxOffset;
      const newValue = this.getValueByOffset(offset);
      this.setState({
        value: newValue,
      });
      return false;
    }

    const value = this.getValueByOffset(offset);
    this.setState({ value });
    return true;
  };

  handleDragEnd = (_event?: DragEvent, dragState?: DragState) => {
    const { vertical, onChange } = this.props;
    const { offsetX, offsetY } = dragState!;

    this.setState({ tooltip: false });

    if (vertical) {
      if (Number.isNaN(offsetY!)) {
        return;
      }
    } else if (Number.isNaN(offsetX!)) {
      return;
    }

    this.offsetStart += vertical ? offsetY! : offsetX!;

    if (typeof onChange === 'function') {
      onChange(this.state.value);
    }
  };

  handleRef = (ref: HTMLDivElement) => {
    const nextContainer = ref;
    const prevContainer = this.container;

    if (prevContainer !== nextContainer) {
      if (prevContainer) {
        prevContainer.removeEventListener('touchstart', preventDefault);
      }
      if (nextContainer) {
        nextContainer.addEventListener('touchstart', preventDefault, { passive: false });
      }
    }
    this.container = nextContainer;
  };

  /**
   * 获取标签
   */
  renderMarkInfo = () => {
    const {
      prefixCls,
      showMark,
      marks = {},
      vertical,
    } = this.props;

    const {
      value,
    } = this.state;

    const isEmptyMarks = typeof marks !== 'object' || JSON.stringify(marks) === '{}';

    if (showMark && isEmptyMarks) {
      console.error('请输入有效的 marks');
      return null;
    }

    // 判断是否为空对象
    if (isEmptyMarks) {
      return null;
    }

    const markKeys = Object.keys(marks || {});

    const markElement = markKeys.map((item) => {
      const markStyle = {
        [vertical ? 'bottom' : 'left']: `${item}%`,
      };

      return (
        <span
          key={item}
          className={`${prefixCls}__mark`}
          style={markStyle}
        >
          {marks[+item]}
        </span>
      );
    });

    const marksElement = showMark && (
      <div className={`${prefixCls}__marks`}>
        {markElement}
      </div>
    );

    const lineDot = markKeys.map((item) => {
      const dotStyle = classnames(`${prefixCls}__line__dot`, {
        [`${prefixCls}__line__dot--active`]: value >= +item,
      });

      const markStyle = {
        [vertical ? 'bottom' : 'left']: `${item}%`,
      };

      return (
        <span key={item} className={dotStyle} style={markStyle} />
      );
    });

    return (
      <>
        {lineDot}
        {marksElement}
      </>
    );
  };

  render() {
    const {
      prefixCls,
      className,
      disabled,
      min,
      max,
      vertical,
      showMark,
    } = this.props;

    const {
      value,
      tooltip,
    } = this.state;

    const offset = this.getOffsetPercent(value);

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--vertical`]: vertical,
      [`${prefixCls}--marked`]: showMark,
    });

    const handleStyle = {
      [vertical ? 'bottom' : 'left']: offset || 0,
    };

    const lineBg = {
      [vertical ? 'height' : 'width']: offset || 0,
    };

    return (
      <div className={cls} ref={this.handleRef}>
        <div className={`${prefixCls}__content`}>
          <div className={`${prefixCls}__line`} ref={(ele) => { this.line = ele; }}>
            <div
              className={`${prefixCls}__line__bg`}
              style={lineBg}
            />

            {this.renderMarkInfo()}
          </div>

          <Drag
            onDragStart={this.handleDragStart}
            onDragMove={this.handleDragMove}
            onDragEnd={this.handleDragEnd}
          >
            <div
              className={`${prefixCls}__handle`}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              aria-orientation={vertical ? 'vertical' : 'horizontal'}
              style={handleStyle}
            >
              <Tooltip trigger="manual" arrowPointAtCenter visible={tooltip} content={value}>
                <div className={`${prefixCls}__handle__shadow`} />
              </Tooltip>
            </div>
          </Drag>
        </div>
      </div>
    );
  }
}
