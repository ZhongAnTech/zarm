import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';

function _getCurrentPoint(e) {
  // console.log("e.touches[0].pageX: ", e.touches[0].pageX , " e.touches[0].screenX: ", e.touches[0].screenX);
  return e.touches[0].pageX;
}

class SwipeAction extends PureComponent {

  constructor(props) {
    super(props);

    this.openedLeft = false;
    this.openedRight = false;
    this.touchEnd = true;
  }

  componentDidMount() {
    Events.on(document.body, 'touchstart', e => this.onCloseSwipe(e));
  }

  componentWillUnmount() {
    Events.off(document.body, 'touchstart', e => this.onCloseSwipe(e));
  }

  onCloseSwipe(e) {
    if (this.openedLeft || this.openedRight) {
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
        if (this.openedLeft || this.openedRight) {
          this.close();
          this.touchEnd = true;
        }
      }
    }
  }

  onBtnClick(e, btn) {
    const onClick = btn.onClick;
    if (onClick) {
      onClick(e);
    }

    if (this.props.autoClose) {
      this.close();
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
    if (!dom) return;

    dom.style.webkitTransitionDuration = `${duration}ms`;
    dom.style.transitionDuration = `${duration}ms`;
    dom.style.webkitTransform = `translate3d(${x}px, ${y}px, 0)`;
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

  renderButtons(buttons, ref) {
    const prefixCls = this.props.prefixCls;

    return (buttons && buttons.length) ? (
      <div
        className={`${prefixCls}-actions-${ref}`}
        ref={(el) => { this[ref] = el; }}>
        {
          buttons.map((btn, i) => {
            const { theme, className, text } = btn;

            const classes = classnames({
              [`${prefixCls}-button`]: true,
              [`theme-${theme}`]: true,
              [className]: !!className,
            });

            return (
              <div
                key={i}
                className={classes}
                onClick={e => this.onBtnClick(e, btn)}>
                <div className={`${prefixCls}-text`}>{text || `${ref}${i}`}</div>
              </div>
            );
          })
        }
      </div>
    ) : null;
  }

  render() {
    const { left, right, children, prefixCls } = this.props;
    return (left.length || right.length) ? (
      <div
        className={`${prefixCls}-wrap`}
        ref={(wrap) => { this.wrap = wrap; }}>
        {this.renderButtons(left, 'left')}
        {this.renderButtons(right, 'right')}
        <div
          className={`${prefixCls}-content`}
          ref={(content) => { this.content = content; }}
          onTouchStart={e => this._onTouchStart(e)}
          onTouchMove={e => this._onTouchMove(e)}
          onTouchEnd={e => this._onTouchEnd(e)}>
          {children}
        </div>
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
  prefixCls: PropTypes.string,
  left: PropTypes.arrayOf,
  right: PropTypes.arrayOf,
};

SwipeAction.defaultProps = {
  prefixCls: 'ui-swipeAction',
  left: [],
  right: [],
  moveTimeDur: 300,
  moveDistanceRatio: 0.5,
  offset: 10,
  onOpen: () => {},
  onClose: () => {},
};

export default SwipeAction;
