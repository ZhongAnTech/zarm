import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';
import Mask from '../Mask';

class Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: props.visible || false,
      isPending: false,
      animationState: 'enter',
    };
    this.animationEnd = this.animationEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  componentWillUpdate() {
    Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.on(this.modal, 'animationend', this.animationEnd);
  }

  componentWillUnmount() {
    Events.off(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.off(this.modal, 'animationend', this.animationEnd);
  }

  animationEnd() {
    if (this.state.animationState === 'leave') {
      this.setState({
        isShow: false,
        isPending: false,
      });
    } else {
      this.setState({
        isShow: true,
        isPending: false,
      });
    }
  }

  enter() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'enter',
    });
  }

  leave() {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'leave',
    });
  }

  render() {
    const { prefixCls, className, animationType, animationDuration, width, minWidth, radius, onMaskClick, children } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const cls = {
      modal: classnames({
        [`${prefixCls}`]: true,
        [className]: !!className,
        radius,
        [`fade-${animationState}`]: isPending,
      }),
      dialog: classnames({
        [`${prefixCls}-dialog`]: true,
        [`${animationType}-${animationState}`]: isPending,
        [`fade-${animationState}`]: isPending,
      }),
      // mask: classnames({
      //   [`fade-${animationState}`]: isPending,
      // }),
    };

    const style = {
      modal: {
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      },
      dialog: {
        width,
        minWidth,
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      },
      // mask: {
      //   WebkitAnimationDuration: `${animationDuration}ms`,
      //   MozAnimationDuration: `${animationDuration}ms`,
      //   msAnimationDuration: `${animationDuration}ms`,
      //   OAnimationDuration: `${animationDuration}ms`,
      //   animationDuration: `${animationDuration}ms`,
      // },
    };

    if (!isShow) {
      style.modal.display = 'none';
    }

    return (
      <div className={cls.modal} style={style.modal} ref={(ele) => { this.modal = ele; }}>
        <div className={`${prefixCls}-wrapper`}>
          <div className={cls.dialog} style={style.dialog} onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
        <Mask
          visible={isShow}
          // className={cls.mask}
          // style={style.mask}
          onClose={onMaskClick}
          />
      </div>
    );
  }
}

Modal.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
  animationType: PropTypes.oneOf([
    'fade', 'door', 'flip', 'rotate', 'zoom',
    'moveUp', 'moveDown', 'moveLeft', 'moveRight',
    'slideUp', 'slideDown', 'slideLeft', 'slideRight',
  ]),
  animationDuration: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.number,
  radius: PropTypes.bool,
  onMaskClick: PropTypes.func,
};

Modal.defaultProps = {
  prefixCls: 'za-modal',
  className: null,
  visible: false,
  animationType: 'zoom',
  animationDuration: 200,
  width: '70%',
  minWidth: 270,
  radius: false,
  onMaskClick() {},
};

export default Modal;

