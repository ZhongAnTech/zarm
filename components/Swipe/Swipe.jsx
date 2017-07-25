import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

class Swipe extends Component {
  constructor(props) {
    super(props);
    this.moveInterval = null;
    this.pointStart = 0;
    this.pointEnd = 0;
    this.timeStart = new Date();
    this.translateX = 0;
    this.state = {
      items: [],
      activeIndex: props.activeIndex,
    };
    this._updateResize = this._updateResize.bind(this);
    this._transitionEnd = this._transitionEnd.bind(this);
  }

  componentWillMount() {
    this._parseItem(this.props);
    this.startAutoPlay(this.props);
  }

  componentDidMount() {
    // 监听窗口变化
    Events.on(window, 'resize', this._updateResize);
    Events.on(this.swipeItems, 'webkitTransitionEnd', this._transitionEnd);
    Events.on(this.swipeItems, 'transitionend', this._transitionEnd);

    // 设置起始位置编号
    this.onJumpTo(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if ('children' in nextProps) {
      this._parseItem(nextProps);
    }

    if ('activeIndex' in nextProps) {
      this.onJumpTo(nextProps.activeIndex);
    }
  }

  componentWillUnmount() {
    // 自动轮播结束
    this.pauseAutoPlay();

    // 移除监听窗口变化
    Events.off(window, 'resize', this._updateResize);
    Events.off(this.swipeItems, 'webkitTransitionEnd', this._transitionEnd);
    Events.off(this.swipeItems, 'transitionend', this._transitionEnd);
  }

  // 滑动到指定编号
  onSlideTo(index) {
    this._onMoveTo(index, this.props.speed);
  }

  // 静默跳到指定编号
  onJumpTo(index) {
    this._onMoveTo(index, 0);
  }

  // 自动轮播开始
  startAutoPlay() {
    this.moveInterval = (this.props.autoPlay && setInterval(() => {
      let activeIndex = this.state.activeIndex;
      const maxLength = this.props.children.length;

      activeIndex = (['left', 'top'].indexOf(this.props.direction) > -1)
        ? (activeIndex + 1)
        : (activeIndex - 1);

      if (activeIndex > maxLength - 1) {
        // 不循环暂停轮播
        if (!this.props.loop) {
          this.pauseAutoPlay();
          return;
        }
        activeIndex = 0;
        this.onJumpTo(-1);
      } else if (activeIndex < 0) {
        activeIndex = maxLength - 1;
        this.onJumpTo(maxLength);
      }
      this.onSlideTo(activeIndex);
    }, this.props.autoPlayIntervalTime));
  }

  // 暂停自动轮播
  pauseAutoPlay() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  }

  // 处理节点（首位拼接）
  _parseItem(props) {
    if (props.children.length === 0) {
      return;
    }

    // 增加头尾拼接节点
    const items = [].concat(props.children);
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    if (props.loop) {
      items.push(firstItem);
      items.unshift(lastItem);
    }

    // 节点追加后重排key
    const newItems = React.Children.map(items, (element, index) => {
      return cloneElement(element, {
        key: index,
      });
    });

    this.setState({
      items: newItems,
    });
  }

  // 更新窗口变化的位置偏移
  _updateResize() {
    this.onJumpTo(this.state.activeIndex);
  }

  // 移动到指定编号
  _onMoveTo(index, speed) {
    const dom = this.swipeItems;
    if (!dom) {
      return;
    }

    const px = (this._isDirectionX())
      ? -dom.offsetWidth * (index + this.props.loop)
      : -dom.offsetHeight * (index + this.props.loop);

    this._doTransition(px, speed);
    this.translateX = px;
    this.setState({
      activeIndex: index,
    });
  }

  // 执行过渡动画
  _doTransition(offset, duration) {
    const dom = this.swipeItems;
    let x = 0;
    let y = 0;

    if (this._isDirectionX()) {
      x = offset;
    } else {
      y = offset;
    }

    dom.style.webkitTransitionDuration = `${duration}ms`;
    dom.style.transitionDuration = `${duration}ms`;
    dom.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  _transitionEnd() {
    const activeIndex = this.state.activeIndex;
    const maxLength = this.props.children.length;

    if (activeIndex > maxLength - 1) {
      this.onJumpTo(0);
    } else if (activeIndex < 0) {
      this.onJumpTo(maxLength - 1);
    }
    this.props.onChangeEnd(this.state.activeIndex);
  }

  // 触屏事件
  _onTouchStart(event) {
    this.pauseAutoPlay();

    const pointX = this._getCurrentPoint(event);
    const activeIndex = this.state.activeIndex;
    const maxLength = this.props.children.length;

    // 跳转到头尾
    if (activeIndex <= 0) {
      this.onJumpTo(0);
    } else if (activeIndex >= (maxLength - 1)) {
      this.onJumpTo(maxLength - 1);
    }

    this.pointStart = pointX;
    this.timeStart = new Date();
  }

  _onTouchMove(event) {
    event.preventDefault();

    const pointX = this._getCurrentPoint(event);
    const px = this.translateX + (pointX - this.pointStart);

    // 设置不循环的时候
    if (!this.props.loop) {
      // 在首页时禁止拖动
      if (this._isLastIndex() && (pointX - this.pointStart) < 0) {
        return;
      }

      // 在尾页时禁止拖动
      if (this._isFirstIndex() && (pointX - this.pointStart) > 0) {
        return;
      }
    }

    this._doTransition(px, 0);
    this.pointEnd = pointX;
  }

  _onTouchEnd() {
    const dom = this.swipeItems;
    const px = (this.pointEnd !== 0)
      ? this.pointEnd - this.pointStart
      : 0;
    const timeSpan = new Date().getTime() - this.timeStart.getTime();

    let activeIndex = this.state.activeIndex;

    // 判断滑动临界点
    // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (
      // 滑动距离超过0
      px !== 0
      &&
      (
        // 滑动距离和父容器长度之比超过moveDistanceRatio
        Math.abs(px / dom.offsetWidth) >= this.props.moveDistanceRatio
        ||
        // 滑动释放时间差低于moveTimeSpan
        timeSpan <= this.props.moveTimeSpan
      )
    ) {
      activeIndex = (px > 0)
        ? (this.state.activeIndex - 1)
        : (this.state.activeIndex + 1);
    }
    this.onSlideTo(activeIndex);
    this.pointStart = 0;
    this.pointEnd = 0;
    // 恢复自动轮播
    this.startAutoPlay();
  }

  // 获取鼠标/触摸点坐标
  _getCurrentPoint(event, type) {
    const touch = (type === 'mouse')
      ? event
      : event.touches[0];

    const offset = (this._isDirectionX())
      ? touch.pageX
      : touch.pageY;

    return offset;
  }

  // 判断当前是否在最后一页
  _isLastIndex() {
    let result = false;
    if (this.state.activeIndex >= this.props.children.length - 1) {
      result = true;
    }
    return result;
  }

  // 判断当前是否在第一页
  _isFirstIndex() {
    let result = false;
    if (this.state.activeIndex <= 0) {
      result = true;
    }
    return result;
  }

  // 是否横向移动
  _isDirectionX() {
    return (['left', 'right'].indexOf(this.props.direction) > -1);
  }

  render() {
    const { prefixCls, className, height, children } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const style = {
      items: {},
      pagination: {},
    };

    if (!this._isDirectionX()) {
      style.items.height = height;
      style.pagination.marginTop = 3;
    } else {
      style.items.whiteSpace = 'nowrap';
      style.pagination.display = 'inline-block';
      style.pagination.marginRight = 3;
    }

    return (
      <div className={classes}>
        <div
          ref={(ele) => { this.swipeItems = ele; }}
          className={`${prefixCls}-items`}
          style={style.items}
          onTouchStart={event => this._onTouchStart(event)}
          onTouchMove={event => this._onTouchMove(event)}
          onTouchEnd={event => this._onTouchEnd(event)}>
          { this.state.items }
        </div>
        <div className={`${prefixCls}-pagination`}>
          <ul>
            {
              Children.map(children, (result, index) => {
                return (
                  <li
                    role="tab"
                    key={`pagination-${index}`}
                    className={classnames({ active: index === this.state.activeIndex })}
                    style={style.pagination}
                    onClick={() => this.onSlideTo(index)}
                    />
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

Swipe.propTypes = {
  prefixCls: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loop: PropTypes.bool,
  activeIndex: PropTypes.number,
  speed: PropTypes.number,
  autoPlay: PropTypes.bool,
  autoPlayIntervalTime: PropTypes.number,
  moveDistanceRatio: PropTypes.number,
  moveTimeSpan: PropTypes.number,
  onChangeEnd: PropTypes.func,
};

Swipe.defaultProps = {
  prefixCls: 'ui-swipe',
  direction: 'left',
  height: 160,
  loop: false,
  activeIndex: 0,
  speed: 300,
  autoPlay: false,
  autoPlayIntervalTime: 3000,
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300,
  onChangeEnd() {},
};

export default Swipe;

