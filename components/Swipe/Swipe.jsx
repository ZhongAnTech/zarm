import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

class Swipe extends Component {
  constructor(props) {
    super(props);
    this.dragState = {};
    this.scrolling = false;
    this.translateX = 0;
    this.translateY = 0;
    this.moveInterval = null;
    this.state = {
      items: [],
      activeIndex: props.activeIndex,
    };
    this.resize = this.resize.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);
  }

  componentWillMount() {
    this.parseItems(this.props);
    this.startAutoPlay(this.props);
  }

  componentDidMount() {
    // 监听窗口变化
    Events.on(window, 'resize', this.resize);
    Events.on(this.swipeItems, 'webkitTransitionEnd', this.transitionEnd);
    Events.on(this.swipeItems, 'transitionend', this.transitionEnd);

    // 设置起始位置编号
    this.onJumpTo(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if ('children' in nextProps) {
      this.parseItems(nextProps);
    }

    if ('activeIndex' in nextProps) {
      this.onJumpTo(nextProps.activeIndex);
    }
  }

  componentWillUnmount() {
    // 自动轮播结束
    this.pauseAutoPlay();

    // 移除监听窗口变化
    Events.off(window, 'resize', this.resize);
    Events.off(this.swipeItems, 'webkitTransitionEnd', this.transitionEnd);
    Events.off(this.swipeItems, 'transitionend', this.transitionEnd);
  }

  // 滑动到指定编号
  onSlideTo(index) {
    this.onMoveTo(index, this.props.speed);
  }

  // 静默跳到指定编号
  onJumpTo(index) {
    this.onMoveTo(index, 0);
  }

  // 移动到指定编号
  onMoveTo(index, speed) {
    const dom = this.swipeItems;
    if (!dom) return;

    this.translateX = -dom.offsetWidth * (index + this.props.loop);
    this.translateY = -dom.offsetHeight * (index + this.props.loop);
    this.doTransition({ x: this.translateX, y: this.translateY }, speed);

    const maxLength = this.props.children.length;
    if (index > maxLength - 1) {
      index = 0;
    } else if (index < 0) {
      index = maxLength - 1;
    }
    this.setState({
      activeIndex: index,
    });
  }

  // 触屏事件
  onTouchStart(event) {
    const dragState = this.dragState;
    const touch = event.touches[0];

    this.scrolling = false;
    dragState.startLeft = touch.pageX;
    dragState.startTop = touch.pageY;
    dragState.startTopAbsolute = touch.clientY;
    dragState.startTime = new Date();

    // 跳转到头尾
    const activeIndex = this.state.activeIndex;
    const maxLength = this.props.children.length;

    if (activeIndex <= 0) {
      this.onJumpTo(0);
    } else if (activeIndex >= (maxLength - 1)) {
      this.onJumpTo(maxLength - 1);
    }

    // 暂停自动轮播
    this.pauseAutoPlay();
  }

  onTouchMove(event) {
    const dragState = this.dragState;
    const touch = event.touches[0];

    const offsetLeft = touch.pageX - dragState.startLeft;
    const offsetTop = touch.clientY - dragState.startTopAbsolute;

    const distanceX = Math.abs(offsetLeft);
    const distanceY = Math.abs(offsetTop);
    // console.log('x: %d, y: %d', distanceX, distanceY);

    if (this.isDirectionX() && (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX))) {
      this.scrolling = true;
      return;
    }

    if (!this.isDirectionX() && (distanceY < 5 || (distanceY >= 5 && distanceX >= 1.73 * distanceY))) {
      this.scrolling = true;
      return;
    }

    this.scrolling = false;
    event.preventDefault();

    // 设置不循环的时候
    if (!this.props.loop) {
      // 在首页时禁止拖动
      if (this.isLastIndex()) {
        if (this.isDirectionX() && offsetLeft < 0) return;
        if (!this.isDirectionX() && offsetTop < 0) return;
      }

      // 在尾页时禁止拖动
      if (this.isFirstIndex()) {
        if (this.isDirectionX() && offsetLeft > 0) return;
        if (!this.isDirectionX() && offsetTop > 0) return;
      }
    }

    dragState.currentLeft = touch.pageX;
    dragState.currentTop = touch.pageY;
    dragState.currentTopAbsolute = touch.clientY;
    this.doTransition({ x: this.translateX + offsetLeft, y: this.translateY + offsetTop }, 0);
  }

  onTouchEnd() {
    const dragState = this.dragState;
    if (!dragState.currentLeft && !dragState.currentTop) return;
    if (this.scrolling) return;

    const offsetLeft = dragState.currentLeft - dragState.startLeft;
    const offsetTop = dragState.currentTop - dragState.startTop;
    const dom = this.swipeItems;

    const moveDistanceRatio = this.isDirectionX()
      ? Math.abs(offsetLeft / dom.offsetWidth)
      : Math.abs(offsetTop / dom.offsetHeight);

    const timeSpan = new Date().getTime() - dragState.startTime.getTime();
    let activeIndex = this.state.activeIndex;

    // 判断滑动临界点
    // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (moveDistanceRatio >= this.props.moveDistanceRatio || timeSpan <= this.props.moveTimeSpan) {
      activeIndex = ((this.isDirectionX() && offsetLeft > 0) || (!this.isDirectionX() && offsetTop > 0))
        ? (this.state.activeIndex - 1)
        : (this.state.activeIndex + 1);

      const { onChange } = this.props;
      typeof onChange === 'function' && onChange(activeIndex);
    }
    this.onSlideTo(activeIndex);
    // 恢复自动轮播
    this.startAutoPlay();
    this.dragState = {};
  }

  // 自动轮播开始
  startAutoPlay() {
    this.moveInterval = (this.props.autoPlay && setInterval(() => {
      let activeIndex = this.state.activeIndex;
      const maxLength = this.props.children.length;

      activeIndex = (['left', 'top'].indexOf(this.props.direction) > -1)
        ? (activeIndex + 1)
        : (activeIndex - 1);

      // 不循环暂停轮播
      if (!this.props.loop && activeIndex > maxLength - 1) {
        this.pauseAutoPlay();
        return;
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
  parseItems(props) {
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
        className: classnames({
          [`${props.prefixCls}-item`]: true,
          [element.props.className]: !!element.props.className,
        }),
      });
    });

    this.setState({
      items: newItems,
    });
  }

  // 更新窗口变化的位置偏移
  resize() {
    this.onJumpTo(this.state.activeIndex);
  }

  // 执行过渡动画
  doTransition(offset, duration) {
    const dom = this.swipeItems;
    let x = 0;
    let y = 0;

    if (this.isDirectionX()) {
      x = offset.x;
    } else {
      y = offset.y;
    }

    dom.style.webkitTransitionDuration = `${duration}ms`;
    dom.style.transitionDuration = `${duration}ms`;
    dom.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  transitionEnd() {
    const activeIndex = this.state.activeIndex;
    const dom = this.swipeItems;
    this.translateX = -dom.offsetWidth * (activeIndex + this.props.loop);
    this.translateY = -dom.offsetHeight * (activeIndex + this.props.loop);
    this.doTransition({ x: this.translateX, y: this.translateY }, 0);

    this.props.onChangeEnd(this.state.activeIndex);
  }

  // 判断当前是否在最后一页
  isLastIndex() {
    return this.state.activeIndex >= this.props.children.length - 1;
  }

  // 判断当前是否在第一页
  isFirstIndex() {
    return this.state.activeIndex <= 0;
  }

  // 是否横向移动
  isDirectionX() {
    return (['left', 'right'].indexOf(this.props.direction) > -1);
  }

  render() {
    const { prefixCls, className, height, showPagination, children } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    const style = {
      items: {},
      pagination: {},
    };

    if (!this.isDirectionX()) {
      style.items.height = height;
    } else {
      style.items.whiteSpace = 'nowrap';
      style.pagination.display = 'inline-block';
    }

    return (
      <div className={classes}>
        <div
          ref={(ele) => { this.swipeItems = ele; }}
          className={`${prefixCls}-items`}
          style={style.items}
          onTouchStart={event => this.onTouchStart(event)}
          onTouchMove={event => this.onTouchMove(event)}
          onTouchEnd={event => this.onTouchEnd(event)}>
          { this.state.items }
        </div>
        {
          showPagination
            ? <div className={`${prefixCls}-pagination`}>
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
            : null
        }
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
  showPagination: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeEnd: PropTypes.func,
};

Swipe.defaultProps = {
  prefixCls: 'za-swipe',
  direction: 'left',
  height: 160,
  loop: false,
  activeIndex: 0,
  speed: 300,
  autoPlay: false,
  autoPlayIntervalTime: 3000,
  moveDistanceRatio: 0.5,
  moveTimeSpan: 300,
  showPagination: true,
  onChange() {},
  onChangeEnd() {},
};

export default Swipe;

