import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';
import Mask from '../Mask';

class Popup extends PureComponent {

  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      isShow: props.visible || false,
      isMaskShow: props.visible || false,
      isPending: false,
      animationState: 'enter',
    };
  }

  componentDidMount() {
    Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.on(this.popup, 'transitionend', this.animationEnd);
  }

  componentWillReceiveProps(nextProps) {
    clearTimeout(this.timer);

    if (nextProps.visible) {
      this.enter(nextProps);
    } else {
      this.leave();
    }
  }

  componentWillUnmount() {
    Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.off(this.popup, 'transitionend', this.animationEnd);
  }

  enter = ({ stayTime, autoClose, onMaskClick }) => {
    this.setState({
      isShow: true,
      isMaskShow: true,
      isPending: true,
      animationState: 'enter',
    });

    if (stayTime === 0) {
      return;
    }

    if (autoClose) {
      this.timer = setTimeout(() => {
        onMaskClick();
        clearTimeout(this.timer);
      }, stayTime);
    }
  }

  leave = () => {
    this.setState({
      isShow: false,
      isPending: true,
      animationState: 'leave',
    });
  }

  animationEnd = () => {
    const { onClose } = this.props;
    const { animationState } = this.state;

    if (animationState === 'leave') {
      this.setState({
        isMaskShow: false,
      });
      typeof onClose === 'function' && onClose();
    }
  }

  render() {
    const { prefixCls, children, onMaskClick, animationDuration, direction, className, maskType } = this.props;
    const { isShow, isPending, animationState, isMaskShow } = this.state;

    const cls = {
      popup: classnames(`${prefixCls}`, className, {
        [`${prefixCls}-hidden`]: !isShow,
      }),
      wrap: classnames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-${direction}`),
      mask: classnames({
        [`fade-${animationState}`]: isPending,
      }),
    };

    const style = {
      wrap: {
        WebkitTransitionDuration: `${animationDuration}ms`,
        transitionDuration: `${animationDuration}ms`,
      },
      mask: {
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      },
    };

    return (
      <div className={cls.popup} ref={(popup) => { this.popup = popup; }}>
        <div className={cls.wrap} style={style.wrap}>
          {children}
        </div>
        {this.props.mask && <Mask className={cls.mask} style={style.mask} visible={isMaskShow} type={maskType} onClose={onMaskClick} />}
      </div>
    );
  }
}

Popup.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  mask: PropTypes.bool,
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  autoClose: PropTypes.bool,  // eslint-disable-line
  stayTime: PropTypes.number, // eslint-disable-line
  animationDuration: PropTypes.number,
  maskType: Mask.propTypes.type,
  onMaskClick: Mask.propTypes.onClose,
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  prefixCls: 'za-popup',
  visible: false,
  mask: true,
  direction: 'bottom',
  autoClose: false,
  stayTime: 3000,
  animationDuration: 200,
  maskType: Mask.defaultProps.type,
  onMaskClick: Mask.defaultProps.onClose,
};

export default Popup;
