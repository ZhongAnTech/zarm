
import React, { Component, PropTypes, cloneElement, Children } from 'react';
import classnames from 'classnames';
// import addEndEventListener from '../utils/transitionEvents';

class Swipe extends Component {

  constructor(props) {
    super(props);
    this.moveInterval = null
    this.state = {
      items        : [],
      activeIndex  : props.activeIndex,
      translateX   : 0,
      pointStart   : 0,
      pointEnd     : 0,
      timeStart    : new Date(),
    };
  }

  componentWillMount() {
    this.parseItem(this.props.children);
  }

  componentDidMount() {
    // 监听窗口变化
    window.addEventListener("resize", () => this._updateResize());
    // this.transitionEvents = addEndEventListener(this.refs.swipeItems, this._transitionEnd.bind(this));

    // 设置起始位置编号
    this.onJumpTo(this.props.activeIndex);
  }

  componentWillReceiveProps(nextProps) {
    if ('children' in nextProps) {
      this.parseItem(nextProps.children)
    }
  }

  componentWillUpdate() {
    setTimeout(this._transitionEnd.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    // 自动轮播结束
    this.pauseAutoPlay();
    // 移除监听窗口变化
    window.removeEventListener("resize", () => this._updateResize());

    // if (this.transitionEvents) {
    //   this.transitionEvents.remove();
    // }
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

  // 滑动到指定编号
  onSlideTo(index) {
    this._onMoveTo(index, this.props.speed);
  }

  // 静默跳到指定编号
  onJumpTo(index) {
    this._onMoveTo(index, 0);
  }

  parseItem(children) {    
    if (children.length == 0) {
      return;
    }

    // 增加头尾拼接节点
    let items = [].concat(children),
        firstItem = items[0],
        lastItem = items[items.length - 1];
    items.push(firstItem);
    items.unshift(lastItem);

    // 节点追加后重排key
    const newItems = React.Children.map(items, (element, index) => {
      return cloneElement(element, {
        key: index
      });
    });

    this.setState({
      items : newItems,
    });

    // 自动轮播开始
    !this.moveInterval && this.startAutoPlay();
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
        activeIndex = 0;
        this.onJumpTo(-1);
        this.onSlideTo(activeIndex);
      } else if (activeIndex < 0) {
        activeIndex = maxLength - 1;
        this.onJumpTo(maxLength);
        this.onSlideTo(activeIndex);
      } else {
        this.onSlideTo(activeIndex);
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

  // 更新窗口变化的位置偏移
  _updateResize() {
    this.onJumpTo(this.props.activeIndex);
  }

  // 移动到指定编号
  _onMoveTo(index, speed) {
    const dom = this.refs.swipeItems,
          px = (this._isDirectionX())
             ? -dom.offsetWidth * (index + 1)
             : -dom.offsetHeight * (index + 1);

    this._doTransition(dom, px, speed);

    this.setState({
      activeIndex : index,
      translateX  : px,
    });
  }

  // 执行过渡动画
  _doTransition(dom, offset, duration) {
    let x = 0,
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

    this.setState({ 
      pointStart : pointX,
      timeStart  : new Date(),
    });
  }

  _onTouchMove(event) {
    event.preventDefault();

    const pointX = this._getCurrentPoint(event),
          px = this.state.translateX  + (pointX - this.state.pointStart),
          dom = this.refs.swipeItems;

    this._doTransition(dom, px, 0);
    this.setState({
      pointEnd: pointX
    });
  }

  _onTouchEnd(event) {

    const px = (this.state.pointEnd !== 0)
             ? this.state.pointEnd - this.state.pointStart
             : 0,
          timeSpan = new Date().getTime() - this.state.timeStart.getTime(),
          dom = this.refs.swipeItems;

    let activeIndex = this.state.activeIndex;

    // 判断滑动临界点
    // 1.滑动距离比超过moveDistanceRatio
    // 2.滑动释放时间差低于moveTimeSpan
    if (Math.abs(px / dom.offsetWidth) >= this.props.moveDistanceRatio || timeSpan <= this.props.moveTimeSpan) {

      activeIndex = (px > 0)
                  ? (this.state.activeIndex - 1)
                  : (this.state.activeIndex + 1);

      this.onSlideTo(activeIndex);
    } else {
      this.onSlideTo(activeIndex);
    }

    // dom.removeEventListener("transitionend", () => this._aaa());


    // 恢复自动轮播
    this.startAutoPlay();

    this.setState({
      pointStart  : 0,
      pointEnd    : 0,
      activeIndex : activeIndex,
    });
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
  height               : PropTypes.number,
  activeIndex          : PropTypes.number,
  speed                : PropTypes.number,
  autoPlay             : PropTypes.bool,
  autoPlayIntervalTime : PropTypes.number,
  moveDistanceRatio    : PropTypes.number,
  moveTimeSpan         : PropTypes.number,
};

Swipe.defaultProps = {
  direction            : 'left',
  height               : 160,
  activeIndex          : 0,
  speed                : 300,
  autoPlay             : true,
  autoPlayIntervalTime : 3000,
  moveDistanceRatio    : 0.5,
  moveTimeSpan         : 300,
};

export default Swipe;

