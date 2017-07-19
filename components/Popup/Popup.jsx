import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';
import Mask from '../Mask';

class Popup extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isShow: this.props.visible || false,
      timer: null,
    };

    this.animationEnd = this.animationEnd.bind(this);
  }

  componentDidMount() {
    Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
  }

  componentWillReceiveProps(nextProps) {
    const { duration, autoClose, onMaskClick } = nextProps;

    if ('visible' in nextProps) {
      this.setState({
        isShow: nextProps.visible,
      });

      if (duration === 0 || this.state.timer) {
        return;
      }
      if (autoClose) {
        this.state.timer = setTimeout(() => {
          onMaskClick();
          clearTimeout(this.state.timer);
          this.setState({
            timer: null,
          });
        }, duration);
      }
    }
  }

  componentWillUnmount() {
    Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
  }

  animationEnd() {
    const { onClose } = this.props;

    !this.state.isShow && typeof onClose === 'function' && onClose();
  }

  render() {
    const { prefixCls, children, onMaskClick, direction, className } = this.props;
    const { isShow } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
    });

    const clsWrap = classnames({
      [`${prefixCls}-wrapper`]: true,
      'ui-popup-hidden': !isShow,
      [`position-${direction}`]: true,
      [className]: !!className,
    });

    return (
      <div className={cls} ref={(popup) => { this.popup = popup; }}>
        <div className={clsWrap}>
          {children}
        </div>
        {this.props.mask && <Mask visible={isShow} onClose={onMaskClick} />}
      </div>
    );
  }
}

Popup.propTypes = {
  prefixCls: PropTypes.string,
  onMaskClick: PropTypes.func,
  onClose: PropTypes.func,

};

Popup.defaultProps = {
  prefixCls: 'ui-popup',
  mask: true,
  direction: 'bottom',
  duration: 3000,
  autoClose: false,
  onMaskClick() {},
  onClose() {},
};

export default Popup;
