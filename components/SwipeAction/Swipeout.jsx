import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

function _getCurrentPoint(e) {
  // console.log("e.touches[0].pageX: ", e.touches[0].pageX , " e.touches[0].screenX: ", e.touches[0].screenX);
  return e.touches[0].pageX;
}

class Swipeout extends Component {

  constructor(props) {
    super(props);

    this.lastX = 0;
    this.direction = 'left';
    this.openedLeft = false;
    this.openedRight = false;
  }

  componentDidMount() {
    this.btnWrapWidth = this.btnWrap.offsetWidth;

    document.body.addEventListener('touchstart', this.onCloseSwipe.bind(this), true);
  }

  onCloseSwipe(ev) {
    if (this.openedLeft || this.openedRight) {
      const pNode = (node => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node.className.indexOf(`${this.props.prefixCls}-content`) > -1) {
            return node;
          }
          node = node.parentNode;
        }
      })(ev.target);
      if (!pNode) {
        ev.preventDefault();
        this.close();
      }
    }
  }

  _onTouchStart(e) {
    if (this.props.disabled) {
      return;
    }
    this.pointStart = _getCurrentPoint(e);
    this.lastX = this.pointStart;
    this.timeStart = new Date();
  }

  _onTouchMove(e) {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }

    // if (this.openedLeft || this.openedRight) {
    //   return;
    // }

    const pointX = _getCurrentPoint(e);
    const px = pointX - this.pointStart;
    const currentX = e.touches[0].clientX;

    this.direction = currentX > this.lastX ? 'right' : 'left';
    this.lastX = currentX;

    if (px > 0) {
      return;
    }

    this._doTransition(px, 0);
    this.pointEnd = pointX;
  }

  _onTouchEnd(e) {
    if (this.props.disabled) {
      return;
    }

    const timeSpan = new Date().getTime() - this.timeStart.getTime();

    if (timeSpan <= this.props.moveTimeDur) {
      this.open(0, 300, false, false);
    } else {
      if (this.direction === 'left') {
        this.open(-this.btnWrapWidth, 300, false, true);
      } else {
        this.close();
      }
    }
  }

  // 执行过渡动画
  _doTransition(offset, duration) {
    const dom = this.content;
    const x = offset;
    const y = 0;

    dom.style.webkitTransitionDuration = `${duration}ms`;
    dom.style.mozTransitionDuration = `${duration}ms`;
    dom.style.oTransitionDuration = `${duration}ms`;
    dom.style.transitionDuration = `${duration}ms`;

    dom.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.mozTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.oTransform = `translate3d(${x}px, ${y}px, 0)`;
    dom.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  open(value, duration, openedLeft, openedRight) {
    if (!this.openedLeft && !this.openedRight) {
      this.props.onOpen();
    }

    this.openedLeft = openedLeft;
    this.openedRight = openedRight;
    this._doTransition(value, duration);
  }

  close() {
    if (this.openedLeft || this.openedRight) {
      this.props.onClose();
    }
    this._doTransition(0, 100);
    this.openedLeft = false;
    this.openedRight = false;
  }

  render() {
    const { className, right, children, prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-wrap`}>
        <div
          className={`${prefixCls}-content`}
          ref={(content) => { this.content = content; }}
          onTouchStart={e => this._onTouchStart(e)}
          onTouchMove={e => this._onTouchMove(e)}
          onTouchEnd={e => this._onTouchEnd(e)}>
          {children}
        </div>
        <div
          className={`${prefixCls}-btn-wrap`}
          ref={(btnWrap) => { this.btnWrap = btnWrap; }}>
          {right}
        </div>
      </div>
    );
  }

}

Swipeout.defaultProps = {
  moveTimeDur: 300,
  onOpen: () => {},
  onClose: () => {},
};

export default Swipeout;
