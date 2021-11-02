import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Events from '../utils/events';
import Drag from '../drag';

export interface SwipeActionProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class SwipeAction extends PureComponent<SwipeActionProps, any> {
  private isOpen = false;

  private touchEnd = true;

  private wrap;

  private left;

  private right;

  static defaultProps: SwipeActionProps = {
    prefixCls: 'za-swipe-action',
    left: [],
    right: [],
    moveDistanceRatio: 0.5,
    moveTimeSpan: 300,
    animationDuration: 300,
    offset: 10,
    autoClose: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      offsetLeft: 0,
    };
  }

  componentDidMount() {
    Events.on(document.body, 'touchstart', this.onCloseSwipe);
    Events.on(document.body, 'click', this.onCloseSwipe);
  }

  componentWillUnmount() {
    Events.off(document.body, 'touchstart', this.onCloseSwipe);
    Events.off(document.body, 'click', this.onCloseSwipe);
  }

  onDragStart = () => {
    if (this.isOpen) {
      this.touchEnd = false;
      this.close();
      return;
    }
    this.touchEnd = true;
  };

  onDragMove = (event, { offsetX, offsetY }) => {
    const { disabled } = this.props;

    if (!this.touchEnd || disabled) {
      return false;
    }

    // 拖动距离达到上限
    const { offset } = this.props;
    const { offsetLeft } = this.state;
    const btnsLeftWidth = this.left && this.left.offsetWidth;
    const btnsRightWidth = this.right && this.right.offsetWidth;

    if (offsetX > 0 && (!btnsLeftWidth || offsetLeft >= btnsLeftWidth + offset)) {
      return false;
    }

    if (offsetX < 0 && (!btnsRightWidth || offsetLeft <= -btnsRightWidth - offset)) {
      return false;
    }

    // 判断滚屏情况
    const distanceX = Math.abs(offsetX);
    const distanceY = Math.abs(offsetY);
    if (distanceX < 5 || (distanceX >= 5 && distanceY >= 0.3 * distanceX)) {
      return false;
    }

    if (!Events.supportsPassiveEvents) {
      event.preventDefault();
    }
    this.doTransition({ offsetLeft: offsetX, animationDuration: 0 });
    return true;
  };

  onDragEnd = (_event, { offsetX, startTime }) => {
    const { animationDuration, moveDistanceRatio, moveTimeSpan } = this.props;
    const timeSpan = new Date().getTime() - startTime.getTime();
    const btnsLeftWidth = this.left && this.left.offsetWidth;
    const btnsRightWidth = this.right && this.right.offsetWidth;

    // if (this.left.offsetWidth) {
    //   this.props.onOpen!();
    // }
    let distanceX = 0;
    let isOpen = false;

    if (offsetX / btnsLeftWidth > moveDistanceRatio || (offsetX > 0 && timeSpan <= moveTimeSpan)) {
      distanceX = btnsLeftWidth;
      isOpen = true;
    } else if (
      offsetX / btnsRightWidth < -moveDistanceRatio ||
      (offsetX < 0 && timeSpan <= moveTimeSpan)
    ) {
      distanceX = -btnsRightWidth;
      isOpen = true;
    }

    if (isOpen && !this.isOpen) {
      // 打开
      this.open(distanceX);
    } else if (!isOpen && this.isOpen) {
      // 关闭
      this.close();
    } else {
      // 还原
      this.doTransition({ offsetLeft: distanceX, animationDuration });
    }
  };

  onCloseSwipe = (e) => {
    if (!this.wrap) {
      return;
    }

    if (this.isOpen) {
      const pNode = ((node) => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node === this.wrap) {
            return node;
          }
          node = node.parentNode;
        }
      })(e.target);

      if (!pNode) {
        e.preventDefault();
        this.touchEnd = true;
        this.close();
      }
    }
  };

  open = (offsetLeft) => {
    const { animationDuration, onOpen } = this.props;
    this.isOpen = true;
    this.doTransition({ offsetLeft, animationDuration });
    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  close = () => {
    const { animationDuration, onClose } = this.props;
    this.isOpen = false;
    this.doTransition({ offsetLeft: 0, animationDuration });
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  doTransition = ({ offsetLeft, animationDuration }) => {
    this.setState({ offsetLeft, animationDuration });
  };

  renderButton = (button, index) => {
    return cloneElement(button, {
      key: +index,
      onClick: (e) => {
        const { onClick } = button.props;
        onClick && onClick(e);
        if (this.props.autoClose) {
          this.close();
        }
      },
    });
  };

  renderButtons = (buttons, direction) => {
    if (!buttons || buttons.length === 0) {
      return;
    }

    const { prefixCls } = this.props;
    const cls = classnames(`${prefixCls}__actions`, `${prefixCls}__actions--${direction}`);

    return (
      <div
        className={cls}
        ref={(el) => {
          this[direction] = el;
        }}
      >
        {buttons.map(this.renderButton)}
      </div>
    );
  };

  render() {
    const { prefixCls, className, left, right, children } = this.props;
    const { offsetLeft, animationDuration } = this.state;
    const cls = classnames(prefixCls, className);
    const style = {
      WebkitTransitionDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
      WebkitTransform: `translateX(${offsetLeft}px)`,
      transform: `translateX(${offsetLeft}px)`,
    };

    return left || right ? (
      <div
        className={cls}
        ref={(wrap) => {
          this.wrap = wrap;
        }}
      >
        {this.renderButtons(left, 'left')}
        {this.renderButtons(right, 'right')}
        <Drag
          onDragStart={this.onDragStart}
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}
        >
          <div className={`${prefixCls}__content`} style={style}>
            {children}
          </div>
        </Drag>
      </div>
    ) : (
      children
    );
  }
}
