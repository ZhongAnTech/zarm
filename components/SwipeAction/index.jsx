import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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

class SwipeAction extends Component {

  constructor(props) {
    super(props);

    this.openedLeft = false;
    this.openedRight = false;
    this.touchEnd = true;
  }

  componentDidMount() {
    // _addListenerMulti(dom, 'webkitTransitionEnd transitionend', () => {
    //   
    // });

    document.body.addEventListener('touchstart', this.onCloseSwipe.bind(this), true);
  }


  onCloseSwipe(ev) {
    if (this.openedLeft || this.openedRight) {
      const pNode = ((node) => {
        while (node.parentNode && node.parentNode !== document.body) {
          if (node === this.wrap) {
            return node;
          }
          node = node.parentNode;
        }
      })(ev.target);
      if (!pNode) {
        ev.preventDefault();
        if (this.openedLeft || this.openedRight) {
          this.close();
          this.touchEnd = true;
        }
      }
    }
  }

  _onTouchStart(e) {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    this.pointStart = _getCurrentPoint(e);
    this.pointEnd = _getCurrentPoint(e);
    if (this.openedLeft || this.openedRight) {
      this.touchEnd = false;
      this.close();
      return;
    }
    this.timeStart = new Date();
  }

  _onTouchMove(e) {
    e.preventDefault();

    if (this.props.disabled) {
      return;
    }

    if (!this.touchEnd) {
      return;
    }
    const { left = [], right = [], offset } = this.props;

    const pointX = _getCurrentPoint(e);
    const posX = pointX - this.pointStart;
    const btnsLeftWidth = this.left && this.left.offsetWidth;
    const btnsRightWidth = this.right && this.right.offsetWidth;

    if (posX < 0 && right.length) {
      if (posX < -btnsRightWidth - offset) {
        return;
      }
      this._doTransition(Math.min(posX, 0), 0);
    } else if (posX > 0 && left.length) {
      if (posX > btnsLeftWidth + offset) {
        return;
      }
      this._doTransition(Math.max(posX, 0), 0);
    }

    this.pointEnd = pointX;
  }

  _onTouchEnd(e) {
    e.preventDefault();
    if (this.props.disabled) {
      return;
    }
    const { left = [], right = [] } = this.props;

    const posX = (this.pointEnd !== 0) ? this.pointEnd - this.pointStart : 0;
    const timeSpan = new Date().getTime() - this.timeStart.getTime();

    const btnsLeftWidth = this.left && this.left.offsetWidth;
    const btnsRightWidth = this.right && this.right.offsetWidth;

    const leftOpenX = btnsLeftWidth * this.props.moveDistanceRatio;
    const rightOpenX = btnsRightWidth * this.props.moveDistanceRatio;

    const openLeft = posX > leftOpenX;
    const openRight = posX < -rightOpenX;

    if (openRight && posX < 0 && right.length) {
      this.open(-btnsRightWidth, 300, false, true);
    } else if (openLeft && posX > 0 && left.length) {
      this.open(btnsLeftWidth, 300, true, false);
    } else {
      this.close();
    }

    this.touchEnd = true;
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

  close(duration = 300) {
    if (this.openedLeft || this.openedRight) {
      this.props.onClose();
    }
    this.openedLeft = false;
    this.openedRight = false;
    this._doTransition(0, duration);
  }

  onBtnClick(e, btn) {
    const onClick = btn.onClick;
    console.log("this.props ->", this.props);
    if (onClick) {
      onClick(e);
    }

    if (this.props.autoClose) {
      this.close();
    }
  }

  renderButtons(buttons, ref) {
    const prefixCls = this.props.prefixCls;

    return (buttons && buttons.length) ? (
      <div
        className={`${prefixCls}-${ref}-btn-wrap`}
        ref={(el) => this[ref] = ReactDOM.findDOMNode(el)}>
        <div className={`${prefixCls}-btn-wrap`}>
          {
            buttons.map((btn, i) => (
              <div
                className={`${prefixCls}-btn theme-${btn.theme} ${btn.hasOwnProperty('className') ? btn.className : ''}`}
                onClick={(e) => this.onBtnClick(e, btn)}
                >
                <div className={`${prefixCls}-text`}>{btn.text || `${ref}${i}`}</div>
              </div>
            ))
          }
        </div>
      </div>
    ) : null;
  }

  render() {
    const { left = [], right = [], children, prefixCls } = this.props;
    return (left.length || right.length) ? (
      <div
        className={`${prefixCls}-wrap`}
        ref={(wrap) => { this.wrap = wrap; }}>
        <div
          className={`${prefixCls}-content`}
          ref={(content) => { this.content = content; }}
          onTouchStart={e => this._onTouchStart(e)}
          onTouchMove={e => this._onTouchMove(e)}
          onTouchEnd={e => this._onTouchEnd(e)}>
          {children}
        </div>
        { this.renderButtons(left, 'left') }
        { this.renderButtons(right, 'right') }
      </div>
    ) : (
      <div
        className={`${prefixCls}-wrap`}>
        <div className={`${prefixCls}-content`}>
          {children}
        </div>
      </div>
    );
  }

}

SwipeAction.propTypes = {
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
};

SwipeAction.defaultProps = {
  prefixCls: 'ui-swipeAction',
  moveTimeDur: 300,
  moveDistanceRatio: 0.5,
  offset: 10,
  theme: 'default',
  onOpen: () => {},
  onClose: () => {},
};

export default SwipeAction;

