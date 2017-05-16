/**
 * Created by lvs on 2017/4/25.
 */
import React, { Component, PropTypes } from 'react';
import SliderInput from './SliderInput';
import pubsub from './pubsub';

// 计算距离顶部和左边的长度
import getOffset from './var/getOffset';

// 获取数组中距离最近的元素
import getNearest from './var/getNearest';

// 根据step过滤数组
import filterByStep from './var/filterByStep';

// 获取小数位长度
import getDigitNumber from './var/getDigitNumber';

// 显示提示图标并自动隐藏
import noticeAni from './var/noticeAni';

// 简单事件绑定
import Event from './var/simpleEvent';

// 设置styles
import setStyle from './var/setStyle';

// 检查是否支持CSS
import supportCSS from './var/supportCSS.js';

// 获取正确的区间
function setRightRange(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}
// 空操作
function noop() {

}

const transform = supportCSS('transform');
// 预设两个值
const key0 = { val: 'value0', dist: 'distance0' };
const key1 = { val: 'value1', dist: 'distance1' };

export default class Slider extends Component {
  constructor(props) {
    super(props);
    const { min, max, defaultValue, range } = this.props;

        // 确保defaultValue的值在min和max之间;
    let value0;
    let value1;


        // 开启了区间模式
    if (range) {
            // 若是数组
      if (Array.isArray(defaultValue)) {
        value0 = setRightRange(defaultValue[0], min, max);
        value1 = setRightRange(defaultValue[1], min, max);
      } else {
        value0 = setRightRange(defaultValue, min, max);
        value1 = max;
      }
    } else {
      value0 = defaultValue;
      value1 = null;
    }

        // 是否加载成功
    this.state = {
      loaded: false,
      value0,
      value1,
    };

        // 根据step确定小数点精确数位
    this.digit = getDigitNumber(this.props.step);
    this.activePoint = 'value0';
  }

    // 通过value获取 distance 或者通过distance获取value
  getValue(distance, reverse) {
    const rate = (this.props.max - this.props.min) / this.barWidth;
    if (reverse) {
      return (distance - this.props.min) / rate;
    }
    return (rate * distance) + this.props.min;
  }

    // 查找距离最近的元素
  getNearest(value) {
    const data = this.mark_data;
    return getNearest(value, data);
  }


    // 输出value时候确保value在距离其最近的坐标上
  handleValue(value) {
    value = this.getNearest(value);
    return value;
  }


    // 初始化
  init() {
        // 根据step显示刻度
    const { min, max, step, marks } = this.props;

        // 根据step和distance创建mark_arr 所有的点都是以mark_arr为基准
        // 数组上最小只能拖动单位为1px 若step精度小于1px 地主家也没有余粮啊 遇到此种情况最好使用输入框手动输入

        // 所有可以用的点的数组
    let mark_arr = [min];
    {
      let next_value = min;
      while (true) {
        next_value += step;
        if (next_value > max) {
          mark_arr.push(max);
          break;
        }
        mark_arr.push(next_value);
      }
    }

        // 显示标签的数组 只用来处理和显示标尺
    let marks_elem_arr = [];

        // 若开启了marks 则显示标尺
    if (marks) {
            // 若有data选项 且是数组，则标尺按照data来处理
      if (marks.data && Array.isArray(marks.data)) {
                // 去除不在max和min范围内的值 并排序
        {
          marks_elem_arr = marks.data.filter((elem) => {
            if (elem >= min && elem <= max) {
              return elem;
            }
          }).sort((a, b) => {
            return a - b;
          });
        }

                // 用户自定的这些点和标准的这些点都是可以用的，所以混合他们 形成新的数组
                // 把data点插入到 mark_arr里面 去重并排序
        {
          let k = marks_elem_arr.length;
          while (k--) {
            if (!~mark_arr.indexOf(marks_elem_arr[k])) {
              mark_arr.push(marks_elem_arr[k]);
            }
          }
          marks_elem_arr.sort((a, b) => {
            return a - b;
          });
        }
      } else {
        // 若没有data数据 则自己构建
        // 默认按照step为基准显示标尺 但是由于step可能很短 会导致挤压 所以可以设定 多少step显示一个标尺
        if (!marks.step) {
          marks.step = 1;
        }
        if (marks.step === step) {
          marks_elem_arr = mark_arr;
        } else {
          marks_elem_arr = filterByStep(mark_arr, marks.step, false);
        }
      }

      // 若开启了只能拖动到点上 则可用数组只能为data里面的数组
      if (this.props.dots) {
        mark_arr = marks_elem_arr;
      }
    }

    this.mark_data = mark_arr;

        // 根据marks_elem_arr 生成标尺dom
    if (marks) {
            // dom
      this.mark_elem = marks_elem_arr.map((elem, i) => {
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${this.getValue(elem, true)}px`,
            }}>
            <div className="marks" />
            {
                            (marks.showLabel || marks.format) ?
                              <div className="marks-label">
                                {
                                        typeof marks.format === 'function'
                                            ? marks.format(elem)
                                            : elem
                                    }
                              </div> : null

                        }
          </div>
        );
      });
    }
  }

  componentDidMount() {
    this.barWidth = this.bar.offsetWidth;
    this.offsetLeft = getOffset(this.bar).left;

        // 初始化
    this.init();

        // 绑定resize事件 动态调整
    Event.add(window, 'resize.slider', () => {
      this.barWidth = this.bar.offsetWidth;
      this.offsetLeft = getOffset(this.bar).left;

      const value0 = this.getNearest(this.state.value0);
      const value1 = this.getNearest(this.state.value1);

            // 重新初始化
      this.init();

      const updateObj = {
        distance0: this.getValue(value0, true),
      };
      if (this.props.range) {
        updateObj.distance1 = this.getValue(value1, true);
      }
      this.setState(updateObj);
    });

        // 针对鼠标的操作事件
    Event.add(document, 'mousemove.slider', (e) => {
      const x = e.clientX;
      if (this.firstDown) {
        this.handleMove(x, key0);
      }
      if (this.secondDown) {
        this.handleMove(x, key1);
      }
    });

        // 针对鼠标的操作事件
    Event.add(document, 'mouseup.slider', (e) => {
      if (this.firstDown) {
        this.firstDown = false;
        this.handleTouchEnd(null, key0);
      }
      if (this.secondDown) {
        this.secondDown = false;
        this.handleTouchEnd(null, key1);
      }
    });

        // 获取值并计算
    const value0 = this.getNearest(this.state.value0);

    const updateObj = {
      loaded: true,
      value0,
      distance0: this.getValue(value0, true),
    };

    if (this.props.range) {
      const value1 = this.getNearest(this.state.value1);
      updateObj.value1 = value1;
      updateObj.distance1 = this.getValue(value1, true);
    }

        // 更新数据
    this.setState(updateObj, () => {
      setStyle(this.pointer_value0, {
        transition: `${transform} 0.2s`,
      });

      if (this.pointer_value1) {
        setStyle(this.pointer_value1, {
          transition: `${transform} 0.2s`,
        });
      }

      setStyle(this.content_bar, {
        transition: 'width 0.2s,margin-left 0.2s',
      });
    });


        // 订阅来自输入框的消息
    pubsub.subscribe('changeFromInput', (value) => {
            // 不可以超出
      if (value > this.props.max) {
        value = this.props.max;
      } else if (value < this.props.min) {
        value = this.props.min;
      }
      const val = this.activePoint;
      const dist = val === 'value1' ? 'distance1' : 'distance0';
      this.setState({
        [val]: this.handleValue(value),
        [dist]: this.getValue(value, true),
      });
    });

    if (this.props.disabled) {
      this.handleTouchEnd = noop;
      this.handleTouchStart = noop;
      this.handleMove = noop;
      this.handleTouchMove = noop;
      this.handleClick = noop;
    }
  }

  componentWillReceiveProps(props) {
    const event_keys = ['handleTouchEnd', 'handleMove', 'handleTouchMove', 'handleClick'];
    if (props.disabled) {
      event_keys.forEach((key) => {
        this[key] = noop;
      });
    } else {
      event_keys.forEach((key) => {
        delete this[key];
      });
    }

    this.setState({
      value0: this.state.value0,
    });
  }


  showNotice(u) {
    const icon = this[`icon_${u.val}`];
    noticeAni(icon, 1500);
  }


    // 处理点击结束之后的事件
  handleTouchEnd(e, u) {
    const { val, dist } = u;

        // 表示当前激活模块
    this.setState({
      [val]: this.state[val],
      [dist]: this.getValue(this.state[val], true),
    });
    this.activePoint = val;

    const pointer = this[`pointer_${u.val}`];

    setStyle(pointer, {
      transition: `${transform} 0.2s`,
    });

    setStyle(this.content_bar, {
      transition: 'width 0.2s,margin-left 0.2s',
    });
  }

  handleTouchStart(e, u) {
        // 禁用pointer的动画
    const pointer = this[`pointer_${u.val}`];

    setStyle(pointer, {
      transition: null,
    });

    setStyle(this.content_bar, {
      transition: null,
    });

    this.showNotice(u);
  }

  handleMove(x, u) {
    x -= this.offsetLeft;
        // 限制滑动范围
    if (x < 0) {
      x = 0;
    } else if (x > this.barWidth) {
      x = this.barWidth;
    }
        // 对应的原声value
    const origin_value = this.getValue(x);

        // 处理过后的value
    const value = this.handleValue(origin_value);

    const { val, dist } = u;
        // 更新界面
    this.setState({
      [val]: value,
      [dist]: x,
    });

    this.showNotice(u);

        // 派发给输入框
    pubsub.dispatch('changeFromSlider', value);
  }

  handleTouchMove(e, u) {
    const x = e.touches[0].clientX;
    this.handleMove(x, u);
  }

  handleClick(e) {
        // 对应的原生value
    const x = e.clientX - this.offsetLeft;

        // 判断点击距离那个最近
    let val = 'value0',
      dist = 'distance0';
    if (this.props.range && Math.abs(x - this.state.distance0) > Math.abs(x - this.state.distance1)) {
      val = 'value1';
      dist = 'distance1';
      this.showNotice(key1);
    } else {
      this.showNotice(key0);
    }

    const origin_value = this.getValue(x);
    const value = this.handleValue(origin_value);

        // 数据相同没必要更新
    if (value === this.state[val]) {
      return;
    }
    this.setState({
      [val]: value,
      [dist]: this.getValue(value, true),
    });

    this.activePoint = val;
        // 派发给输入框
    pubsub.dispatch('changeFromSlider', value);
  }

  componentDidUpdate() {
    let value = this.state.value0;
    if (this.props.range) {
      value = [this.state.value0, this.state.value1];
      value.sort((a, b) => {
        return a - b;
      });
    }
    this.props.onChange && this.props.onChange(value);
  }

  componentWillUnmout() {
    Event.remove(window, 'resize.slider');
    Event.remove(document, 'mousemove.slider mouseup.slider');
  }

  render() {
    const props = this.props;


    const content_bar_style = {
      width: `${this.state.distance0}px`,
    };

        // 计算value1和value2
    if (this.props.range) {
      content_bar_style.marginLeft = `${Math.min(this.state.distance0, this.state.distance1)}px`;
      content_bar_style.width = `${Math.abs(this.state.distance0 - this.state.distance1)}px`;
    }

    return (
      <div
        className={`ui-slider${this.props.input ? ' show-input' : ''}${this.props.disabled ? ' disabled' : ''}`}
        onTouchMove={(e) => {
          e.preventDefault();
        }}>
        <div
          className="ui-slider-bar"
          ref={bar => this.bar = bar}>
          {
                        this.barWidth
                            ? (
                              <div
                                style={{
                                  height: '100%',
                                }}
                                onClick={e => this.handleClick(e)}>
                                <div
                                  className="ui-slider-content-bar"
                                  style={content_bar_style}
                                  ref={content_bar => this.content_bar = content_bar}
                                  />

                                <div
                                  className="pointer"
                                  ref={(pointer => this.pointer_value0 = pointer)}
                                  style={{ [transform]: `translateX(${this.state.distance0}px)` }}
                                  onTouchStart={e => this.handleTouchStart(e, key0)}
                                  onTouchEnd={e => this.handleTouchEnd(e, key0)}
                                  onTouchMove={e => this.handleTouchMove(e, key0)}
                                  onMouseDown={(e) => {
                                    this.firstDown = true;
                                    this.handleTouchStart(e, key0);
                                  }}
                                  onTransitionEnd={e => this.handleTransitionEnd(e, key0)}>
                                  {
                                        this.props.tips
                                            ?
                                              <div
                                                className="notice-icon"
                                                ref={icon => this.icon_value0 = icon}>{
                                                typeof this.props.tips === 'function'
                                                    ? this.props.tips(this.state.value0)
                                                    : this.state.value0
                                            }
                                              </div>
                                            : null
                                    }
                                </div>

                                {
                                    this.props.range ?
                                      <div
                                        ref={(pointer => this.pointer_value1 = pointer)}
                                        className="pointer"
                                        style={{
                                          [transform]: `translateX(${this.state.distance1}px)`,
                                        }}
                                        onTouchStart={e => this.handleTouchStart(e, key1)}
                                        onTouchEnd={e => this.handleTouchEnd(e, key1)}
                                        onTouchMove={e => this.handleTouchMove(e, key1)}
                                        onMouseDown={(e) => {
                                          this.secondDown = true;
                                          this.handleTouchStart(e, key1);
                                        }}>
                                        {
                                                this.props.tips ?
                                                  <div
                                                    className="notice-icon"
                                                    ref={icon => this.icon_value1 = icon}>{
                                                        typeof this.props.tips === 'function'
                                                            ? this.props.tips(this.state.value1)
                                                            : this.state.value1
                                                    }
                                                  </div>
                                                    : null
                                            }
                                      </div>
                                        : null
                                }


                                <div className="marks-box">
                                  {this.mark_elem}
                                </div>

                              </div>
                        )
                            : null
                    }
        </div>

        {
                    this.props.input ?
                      <SliderInput
                        value={this.state.value0}
                        handleValue={this.handleValue.bind(this)}
                        mark_data={this.mark_data}
                        {...props}
                        />
                        : null
                }
      </div>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  range: PropTypes.bool,
  input: PropTypes.bool,
  defaultValue: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.array,
  ]),
    //    tips
    //    marks
  include: PropTypes.bool,
  dots: PropTypes.bool,
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  className: null,
  defaultValue: 0,
  disabled: false,
  range: false,
  input: false,          // 是否有尾部的输入框
  tips: '[value]', // value会自动替换[value]
  marks: false,           // 是否会显示标尺
  dots: false,               //是否只能拖动到刻度上
};
