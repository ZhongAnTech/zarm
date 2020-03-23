import React, { Component, cloneElement, Children, CSSProperties } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Events from '../utils/events';
import Drag from '../drag';

export interface CarouselProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Carousel extends Component<CarouselProps, any> {
  static defaultProps = {
    prefixCls: 'za-carousel',
    direction: 'left',
    height: 160,
    loop: false,
    activeIndex: 0,
    animationDuration: 300,
    swipeable: true,
    autoPlay: false,
    autoPlayIntervalTime: 3000,
    moveDistanceRatio: 0.5,
    moveTimeSpan: 300,
    showPagination: true,
  };

  private carouselItems;

  private moveInterval;

  private translateX = 0;

  private translateY = 0;

  constructor(props) {
    super(props);
    this.state = {
      // items: [],
      activeIndex: props.activeIndex,
      activeIndexChanged: false,
    };
  }

  componentDidMount() {
    const { activeIndex } = this.props;

    // 监听窗口变化
    Events.on(window, 'resize', this.resize);
    this.startAutoPlay();
    // 设置起始位置编号
    this.onJumpTo(activeIndex);
  }

  componentDidUpdate(prevProps) {
    const { activeIndex } = this.props;
    if (activeIndex !== prevProps.activeIndex) {
      this.onSlideTo(activeIndex);
    }
  }

  componentWillUnmount() {
    // 自动轮播结束
    this.pauseAutoPlay();

    // 移除监听窗口变化
    Events.off(window, 'resize', this.resize);
    Events.off(this.carouselItems, 'webkitTransitionEnd', this.transitionEnd);
    Events.off(this.carouselItems, 'transitionend', this.transitionEnd);
  }

  // 滑动到指定编号
  onSlideTo = (index) => {
    this.onMoveTo(index, this.props.animationDuration);
  };

  // 静默跳到指定编号
  onJumpTo = (index) => {
    this.onMoveTo(index, 0);
  };

  // 移动到指定编号
  onMoveTo = (index, animationDuration) => {
    const dom = this.carouselItems;

    const { loop, children, onChange } = this.props;
    const maxLength = children.length;
    const previousIndex = this.state.activeIndex;

    this.translateX = -dom.offsetWidth * (index + loop);
    this.translateY = -dom.offsetHeight * (index + loop);
    this.doTransition({ x: this.translateX, y: this.translateY }, animationDuration);

    if (index > maxLength - 1) {
      index = 0;
    } else if (index < 0) {
      index = maxLength - 1;
    }
    const activeIndexChanged = previousIndex !== index;
    this.setState({
      activeIndex: index,
      activeIndexChanged,
    });

    if (typeof onChange === 'function' && activeIndexChanged) {
      onChange(index);
    }
  };

  // 触屏事件
  onDragStart = () => {
    const { swipeable } = this.props;
    if (!swipeable) {
      return false;
    }
    // 跳转到头尾
    const { activeIndex } = this.state;
    const maxLength = this.props.children.length;

    if (activeIndex <= 0) {
      this.onJumpTo(0);
    } else if (activeIndex >= (maxLength - 1)) {
      this.onJumpTo(maxLength - 1);
    }

    // 暂停自动轮播
    this.pauseAutoPlay();
  };

  onDragMove = (event, { offsetX, offsetY }) => {
    const { swipeable } = this.props;
    if (!swipeable) {
      return false;
    }
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);

    if (
      this.isDirectionX()
      && (
        distanceX < 5
        || (distanceX >= 5 && distanceY >= 1.73 * distanceX)
      )
    ) {
      return false;
    }

    if (
      !this.isDirectionX()
      && (
        distanceY < 5
        || (distanceY >= 5 && distanceX >= 1.73 * distanceY)
      )
    ) {
      return false;
    }

    // 设置不循环的时候
    if (!this.props.loop) {
      // 在尾页时禁止拖动
      if (this.isLastIndex()) {
        if (
          (this.isDirectionX() && offsetX < 0)
          || (!this.isDirectionX() && offsetY < 0)
        ) {
          return false;
        }
      }

      // 在首页时禁止拖动
      if (this.isFirstIndex()) {
        if (
          (this.isDirectionX() && offsetX > 0)
          || (!this.isDirectionX() && offsetY > 0)
        ) {
          return false;
        }
      }
    }

    event.preventDefault();

    this.doTransition({ x: this.translateX + offsetX, y: this.translateY + offsetY }, 0);
    return true;
  };

  onDragEnd = (_event, { offsetX, offsetY, startTime }) => {
    const { swipeable } = this.props;
    if (!swipeable) {
      return false;
    }
    if (!offsetX && !offsetY) {
      return;
    }

    const { moveDistanceRatio, moveTimeSpan } = this.props;
    let { activeIndex } = this.state;

    const dom = this.carouselItems;
    const timeSpan = new Date().getTime() - startTime.getTime();
    const ratio = this.isDirectionX()
      ? Math.abs(offsetX / dom.offsetWidth)
      : Math.abs(offsetY / dom.offsetHeight);

    // 判断滑动临界点
    // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (ratio >= moveDistanceRatio! || timeSpan <= moveTimeSpan!) {
      const action = (this.isDirectionX() && offsetX > 0) || (!this.isDirectionX() && offsetY > 0)
        ? 'prev'
        : 'next';

      activeIndex = (action === 'next')
        ? activeIndex + 1
        : activeIndex - 1;
    }

    this.onSlideTo(activeIndex);

    // 恢复自动轮播
    this.startAutoPlay();
  };

  // 自动轮播开始
  startAutoPlay = () => {
    const { direction, loop, autoPlay, autoPlayIntervalTime } = this.props;

    this.moveInterval = (autoPlay && setInterval(() => {
      let { activeIndex } = this.state;
      const isLeftOrUpDirection = (['left', 'up']).indexOf(direction!) > -1;

      activeIndex = isLeftOrUpDirection
        ? (activeIndex + 1)
        : (activeIndex - 1);

      // 不循环暂停轮播
      if (!loop && (isLeftOrUpDirection ? this.isLastIndex() : this.isFirstIndex())) {
        this.pauseAutoPlay();
        return;
      }
      this.onSlideTo(activeIndex);
    }, autoPlayIntervalTime));
  };

  // 暂停自动轮播
  pauseAutoPlay = () => {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
  };

  // 处理节点（首尾拼接）
  parseItems = (props) => {
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
    const newItems = React.Children.map(items, (element: any, index) => {
      return cloneElement(element, {
        key: index,
        className: classnames(`${props.prefixCls}__item`, element.props.className),
      });
    });
    return newItems;
  };

  // 更新窗口变化的位置偏移
  resize = () => {
    this.onJumpTo(this.state.activeIndex);
  };

  // 执行过渡动画
  doTransition = (offset, animationDuration) => {
    const dom = this.carouselItems;
    let x = 0;
    let y = 0;

    if (this.isDirectionX()) {
      ({ x } = offset);
    } else {
      ({ y } = offset);
    }

    dom.style.WebkitTransformDuration = `${animationDuration}ms`;
    dom.style.transitionDuration = `${animationDuration}ms`;
    dom.style.WebkitTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  transitionEnd = () => {
    const { onChangeEnd } = this.props;
    const { activeIndex, activeIndexChanged } = this.state;
    const dom = this.carouselItems;

    this.translateX = -dom.offsetWidth * (activeIndex + this.props.loop);
    this.translateY = -dom.offsetHeight * (activeIndex + this.props.loop);
    this.doTransition({ x: this.translateX, y: this.translateY }, 0);

    if (typeof onChangeEnd === 'function' && activeIndexChanged) {
      onChangeEnd(activeIndex);
    }
  };

  // 判断当前是否在最后一页
  isLastIndex = () => {
    return this.state.activeIndex >= this.props.children.length - 1;
  };

  // 判断当前是否在第一页
  isFirstIndex = () => {
    return this.state.activeIndex <= 0;
  };

  // 是否横向移动
  isDirectionX = () => {
    return (['left', 'right'].indexOf(this.props.direction!) > -1);
  };

  renderPaginationItem = (_result, index) => {
    const { prefixCls } = this.props;
    const paginationItemCls = classnames(`${prefixCls}__pagination__item`, {
      [`${prefixCls}__pagination__item--active`]: index === this.state.activeIndex,
    });

    return (
      <div
        key={`pagination-${index}`}
        className={paginationItemCls}
        onClick={() => this.onSlideTo(index)}
      />
    );
  };

  renderPagination = () => {
    const { prefixCls, showPagination, children } = this.props;
    return showPagination && (
      <div className={`${prefixCls}__pagination`}>
        {Children.map(children, this.renderPaginationItem)}
      </div>
    );
  };

  render() {
    const { prefixCls, className, height, style } = this.props;
    const items = this.parseItems(this.props);
    const itemsStyle: CSSProperties = {};

    const direction = this.isDirectionX() ? 'horizontal' : 'vertical';
    const cls = classnames(prefixCls, className, `${prefixCls}--${direction}`);

    if (!this.isDirectionX()) {
      itemsStyle.height = height;
    }

    const content = (
      <div
        ref={(ele) => { this.carouselItems = ele; }}
        className={`${prefixCls}__items`}
        onTransitionEnd={this.transitionEnd}
        style={itemsStyle}
      >
        {items}
      </div>
    );

    return (
      <div className={cls} style={style}>
        <Drag
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}
        >
          {content}
        </Drag>
        {this.renderPagination()}
      </div>
    );
  }
}
