import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Mask from '../Mask';

class Modal extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShow: props.visible || false,
      isPending: false,
      animationState: 'enter',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  componentWillUpdate() {
    this.modal.addEventListener('webkitAnimationEnd', () => this.animationEnd());
    this.modal.addEventListener('animationEnd', () => this.animationEnd());
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
    const { prefixCls, animationType, animationDuration, width, minWidth, isRadius, className, onMaskClick, children } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const classes = {
      modal: classnames({
        [`${prefixCls}`]: true,
        radius: ('radius' in this.props || isRadius),
        [`fade-${animationState}`]: isPending,
        [className]: !!className,
      }),
      dialog: classnames({
        [`${prefixCls}-dialog`]: true,
        [`${animationType}-${animationState}`]: isPending,
      }),
    };

    const style = {
      modal: {
        WebkitAnimationDuration: `${animationDuration}ms`,
        MozAnimationDuration: `${animationDuration}ms`,
        msAnimationDuration: `${animationDuration}ms`,
        OAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      },
      dialog: {
        width,
        minWidth,
        WebkitAnimationDuration: `${animationDuration}ms`,
        MozAnimationDuration: `${animationDuration}ms`,
        msAnimationDuration: `${animationDuration}ms`,
        OAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      },
    };

    if (!isShow) {
      style.modal.display = 'none';
    }

    return (
      <div className={classes.modal} style={style.modal} ref={(modal) => { this.modal = modal; }}>
        <div className={`${prefixCls}-wrapper`}>
          <div className={classes.dialog} style={style.dialog} onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
        <Mask visible={isShow} onClose={onMaskClick} />
      </div>
    );
  }
}

Modal.propTypes = {
  prefixCls: PropTypes.string,
  visible: PropTypes.bool,
  animationType: PropTypes.oneOf([
    'fade', 'door', 'flip', 'rotate', 'zoom',
    'moveUp', 'moveDown', 'moveLeft', 'moveRight',
    'slideUp', 'slideDown', 'slideLeft', 'slideRight',
  ]),
  animationDuration: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.number,
  isRadius: PropTypes.bool,
  onMaskClick: PropTypes.func,
};

Modal.defaultProps = {
  prefixCls: 'ui-modal',
  visible: false,
  animationType: 'zoom',
  animationDuration: 200,
  width: '70%',
  minWidth: 270,
  isRadius: false,
  onMaskClick: () => {},
};

export default Modal;

