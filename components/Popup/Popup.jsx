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
      typeof onClose === 'function' && onClose();
    }
    // !this.state.isShow &&
  }

  render() {
    const { prefixCls, children, onMaskClick, animationDuration, direction, className, maskType } = this.props;
    const { isShow, isMaskShow } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`${prefixCls}-hidden`]: !isShow,
    });

    const clsWrap = classnames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-${direction}`]: true,
    });

    const style = {
      mask: {
        WebkitAnimationDuration: `${animationDuration}ms`,
        MozAnimationDuration: `${animationDuration}ms`,
        msAnimationDuration: `${animationDuration}ms`,
        OAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      },
    };

    // if (!isShow) {
    //   style.modal.display = 'none';
    // }


    return (
      <div className={cls} ref={(popup) => { this.popup = popup; }}>
        <div className={clsWrap}>
          {children}
        </div>
        {this.props.mask && <Mask visible={isMaskShow} type={maskType} onClose={onMaskClick} />}
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
  prefixCls: 'ui-popup',
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
