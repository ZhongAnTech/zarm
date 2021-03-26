import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

function _getCurrentPoint(e) {
  // console.log("e.touches[0].pageX: ", e.touches[0].pageX , " e.touches[0].screenX: ", e.touches[0].screenX);
  return e.touches[0].pageX;
}

function _addListenerMulti(el, s, fn) {
  const evts = s.split(' ');
  for (let i = 0, iLen = evts.length; i < iLen; i += 1) {
    el.addEventListener(evts[i], fn, false);
  }
}

class Swipeout extends Component {

  constructor(props) {
    super(props);

    this.openedLeft = false;
    this.openedRight = false;
  }

  componentDidMount() {
    this.btnWrapWidth = this.btnWrap.offsetWidth;

    document.body.addEventListener('touchstart', this.onCloseSwipe.bind(this), true);
  }

  onCloseSwipe(ev) {
    if (this.openedLeft || this.openedRight) {
      const pNode = ((node) => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node.className.indexOf(`${this.props.prefixCls}-wrap`) > -1) {
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

    console.log("touchstart openedRight ->", this.openedRight);
    this.pointStart = _getCurrentPoint(e);
    this.pointEnd = _getCurrentPoint(e);
    if (this.openedRight) {
      this.close(300);
      return;
    }
    this.timeStart = new Date();
  }

  _onTouchMove(e) {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }

    const pointX = _getCurrentPoint(e);
    const px = pointX - this.pointStart;

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

    const dom = this.btnWrap;
    const px = (this.pointEnd !== 0) ? this.pointEnd - this.pointStart : 0;

    const timeSpan = new Date().getTime() - this.timeStart.getTime();

    if (px !== 0 && (
        // 滑动距离和父容器长度之比超过moveDistanceRatio
        Math.abs(px / dom.offsetWidth) >= this.props.moveDistanceRatio
        ||
        // 滑动释放时间差低于moveTimeDur
        timeSpan <= this.props.moveTimeDur
      )
    ) {
      this.open(-this.btnWrapWidth, 300, false, true);
    } else {
      this.close(300);
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

  close(duration = 100) {
    const dom = this.content;

    if (this.openedLeft || this.openedRight) {
      this.props.onClose();
    }
    this._doTransition(0, duration);

    _addListenerMulti(dom, 'webkitTransitionEnd transitionend', () => {
      this.openedLeft = !this.openedLeft;
      this.openedRight = !this.openedRight;
    });
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
  moveDistanceRatio: 0.5,
  onOpen: () => {},
  onClose: () => {},
};

export default Swipeout;
