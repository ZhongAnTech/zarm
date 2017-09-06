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
      isShow: this.props.visible || false,
      isMaskShow: this.props.visible || false,
      animationState: 'enter',
      isPending: false,
    };
    this.animationEnd = this.animationEnd.bind(this);
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

  enter({ duration, autoClose, onMaskClick }) {
    this.setState({
      isShow: true,
      isMaskShow: true,
      isPending: true,
      animationState: 'enter',
    });

    if (duration === 0) {
      return;
    }

    if (autoClose) {
      this.timer = setTimeout(() => {
        onMaskClick();
        clearTimeout(this.timer);
      }, duration);
    }
  }

  leave() {
    this.setState({
      isShow: false,
      isPending: true,
      animationState: 'leave',
    });
  }

  animationEnd() {
    const { onClose } = this.props;
    const { animationState } = this.state;

    if (animationState === 'leave') {
      this.setState({
        isMaskShow: false,
      });
      onClose();
    }
  }

  render() {
    const { prefixCls, children, onMaskClick, animationDuration, direction, className, maskType } = this.props;
    const { isShow, isPending, animationState, isMaskShow } = this.state;

    const cls = {
      popup: classnames({
        [`${prefixCls}`]: true,
        [`${prefixCls}-hidden`]: !isShow,
        [className]: !!className,
      }),
      wrap: classnames({
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-wrapper-${direction}`]: true,
      }),
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
  duration: PropTypes.number, // eslint-disable-line
  autoClose: PropTypes.bool,  // eslint-disable-line
  onClose: PropTypes.func,
  maskType: Mask.propTypes.type,
  animationDuration: PropTypes.number,
  onMaskClick: Mask.propTypes.onClose,
};

Popup.defaultProps = {
  prefixCls: 'za-popup',
  className: null,
  visible: false,
  mask: true,
  direction: 'bottom',
  duration: 3000,
  autoClose: false,
  onClose() {},
  animationDuration: 200,
  maskType: Mask.defaultProps.type,
  onMaskClick: Mask.defaultProps.onClose,
};

export default Popup;
