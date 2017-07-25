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
    });

    if (duration === 0 || this.timer) {
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
    });
  }

  animationEnd() {
    const { onClose } = this.props;
    !this.state.isShow && typeof onClose === 'function' && onClose();
  }

  render() {
    const { prefixCls, children, onMaskClick, direction, className, maskType } = this.props;
    const { isShow } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`${prefixCls}-hidden`]: !isShow,
    });

    const clsWrap = classnames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-${direction}`]: true,
    });

    return (
      <div className={cls} ref={(popup) => { this.popup = popup; }}>
        <div className={clsWrap}>
          {children}
        </div>
        {this.props.mask && <Mask visible={isShow} type={maskType} onClose={onMaskClick} />}
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
  maskType: Mask.defaultProps.type,
  onMaskClick: Mask.defaultProps.onClose,
};

export default Popup;
