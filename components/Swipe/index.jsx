
import React, { Component, PropTypes, cloneElement, Children } from 'react';
import classnames from 'classnames';
// import addEndEventListener from '../utils/transitionEvents';

class Swipe extends Component {

  constructor(props) {
    super(props);
    this.moveInterval = null;
    this.pointStart = 0;
    this.pointEnd = 0;
    this.timeStart = new Date();
    this.translateX = 0;

    this.state = {
      items        : [],
      activeIndex  : props.activeIndex,
    };
  }

  componentWillMount() {
    this.parseItem(this.props);
  }

  componentDidMount() {
    // 监听窗口变化
    window.addEventListener("resize", this._updateResize);
    this.refs.swipeItems.addEventListener("webkitTransitionEnd", () => this._transitionEnd());
    this.refs.swipeItems.addEventListener("transitionend", () => this._transitionEnd());

    // 设置起始位置编号
    this.onJumpTo(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if ('children' in nextProps) {
      this.parseItem(nextProps)
    }
  }

  componentWillUnmount() {
    // 自动轮播结束
    this.pauseAutoPlay();
    // 移除监听窗口变化
    window.removeEventListener("resize", this._updateResize);
    this.refs.swipeItems.removeEventListener("webkitTransitionEnd", () => this._transitionEnd());
    this.refs.swipeItems.removeEventListener("transitionend", () => this._transitionEnd());

  }

  render () {
    const { className, height, children, ...others } = this.props;

    const classes = classnames({
      'ui-swipe'  : true,
      [className] : !!className,
    });

    const style = {
      items      : {},
      pagination : {},
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
      <div {...others} className={classes}>
        <div ref="swipeItems"
          className="ui-swipe-items"
          style={style.items}
          onTouchStart={(event) => this._onTouchStart(event)}
          onTouchMove={(event) => this._onTouchMove(event)}
          onTouchEnd={(event) => this._onTouchEnd(event)}>
          { this.state.items }
        </div>
        <div className="ui-swipe-pagination">
          <ul>
            {
              Children.map(children, (result, index) => {
                return <li key={"pagination-" + index} className={classnames({'active': index == this.state.activeIndex})} style={style.pagination} onClick={() => this.onSlideTo(index)} />
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  parseItem(props) {    
    if (props.children.length == 0) {
      return;
    }

    // 增加头尾拼接节点
    let items = [].concat(props.children),
        firstItem = items[0],
        lastItem = items[items.length - 1];

    if (props.isLoop) {
      items.push(firstItem);
      items.unshift(lastItem);
    }

    // 节点追加后重排key
    const newItems = React.Children.map(items, (element, index) => {
      return cloneElement(element, {
        key: index
      });
    });

    this.setState({
      items: newItems,
    });

    // 自动轮播开始
    !this.moveInterval && this.startAutoPlay(props);
  }

  // 自动轮播开始
  startAutoPlay() {
    this.moveInterval = (this.props.autoPlay && setInterval(() => {
      let activeIndex = this.state.activeIndex,
          maxLength = this.props.children.length;

      activeIndex = (['left', 'top'].indexOf(this.props.direction) > -1)
                  ? (activeIndex + 1)
                  : (activeIndex - 1);

      if (activeIndex > maxLength - 1) {
        // 不循环暂停轮播
        if (!this.props.isLoop) {
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

  // 滑动到指定编号
  onSlideTo(index) {
    this._onMoveTo(index, this.props.speed);
  }

  // 静默跳到指定编号
  onJumpTo(index) {
    this._onMoveTo(index, 0);
  }

  // 更新窗口变化的位置偏移
  _updateResize() {
    this.onJumpTo(this.props.activeIndex);
  }

  // 移动到指定编号
  _onMoveTo(index, speed) {
    const dom = this.refs.swipeItems;
    if (!dom) {
      return;
    }

    const px = (this._isDirectionX())
             ? -dom.offsetWidth * (index + this.props.isLoop)
             : -dom.offsetHeight * (index + this.props.isLoop);

    this._doTransition(px, speed);
    this.translateX = px;
    this.setState({
      activeIndex : index,
    });
  }

  // 执行过渡动画
  _doTransition(offset, duration) {
    let dom = this.refs.swipeItems,
        x = 0,
        y = 0;

    if (this._isDirectionX()) {
      x = offset;
    } else {
      y = offset;
    }

    dom.style.webkitTransitionDuration = duration + "ms";
    dom.style.mozTransitionDuration = duration + "ms";
    dom.style.oTransitionDuration = duration + "ms";
    dom.style.transitionDuration = duration + "ms";
    dom.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, 0)";
    dom.style.mozTransform = "translate3d(" + x + "px, " + y + "px, 0)";
    dom.style.oTransform = "translate3d(" + x + "px, " + y + "px, 0)";
    dom.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
  }

  _transitionEnd() {
    let activeIndex = this.state.activeIndex,
        maxLength = this.props.children.length;

    if (activeIndex > maxLength - 1) {
      this.onJumpTo(0);
    } else if (activeIndex < 0) {
      this.onJumpTo(maxLength - 1);
    }
    this.props.onChangeEnd(this.state.activeIndex)
  }
  
  // 触屏事件
  _onTouchStart(event) {
    this.pauseAutoPlay();

    let pointX = this._getCurrentPoint(event),
        activeIndex = this.state.activeIndex,
        maxLength = this.props.children.length;

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

    const pointX = this._getCurrentPoint(event),
          px = this.translateX  + (pointX - this.pointStart),
          dom = this.refs.swipeItems;

    // 设置不循环的时候，当前如果是在头尾页时禁止拖动
    if (
      !this.props.isLoop
      &&
      (this._isLastIndex() && (pointX - this.pointStart) < 0 || this._isFirstIndex() && (pointX - this.pointStart) > 0)
    ) {
      return;
    }

    this._doTransition(px, 0);
    this.pointEnd = pointX;
  }

  _onTouchEnd(event) {
    const dom = this.refs.swipeItems,
          px = (this.pointEnd !== 0)
             ? this.pointEnd - this.pointStart
             : 0,
          timeSpan = new Date().getTime() - this.timeStart.getTime();

    let activeIndex = this.state.activeIndex;

    // 判断滑动临界点
    // 1.滑动距离超过0，且滑动距离和父容器长度之比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (
      // 滑动距离超过0
      px != 0
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
    var touch = (type == 'mouse')
              ? event
              : event.touches[0];

    var offset = (this._isDirectionX())
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
    var dir = (['left', 'right'].indexOf(this.props.direction) > -1)
            ? true
            : false;
    return dir;
  }

}

Swipe.propTypes = {
  direction            : PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  height               : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoop               : PropTypes.bool,
  activeIndex          : PropTypes.number,
  speed                : PropTypes.number,
  autoPlay             : PropTypes.bool,
  autoPlayIntervalTime : PropTypes.number,
  moveDistanceRatio    : PropTypes.number,
  moveTimeSpan         : PropTypes.number,
  onChangeEnd          : PropTypes.func,
};

Swipe.defaultProps = {
  direction            : 'left',
  height               : 160,
  isLoop               : true,
  activeIndex          : 0,
  speed                : 300,
  autoPlay             : true,
  autoPlayIntervalTime : 3000,
  moveDistanceRatio    : 0.5,
  moveTimeSpan         : 300,
  onChangeEnd          : () => {},
};

export default Swipe;

