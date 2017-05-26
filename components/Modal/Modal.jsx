import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Modal extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShow: props.visible || false,
      isPending: false,
      animationState: 'enter',
    };

    this.resolveAnimationFrame = this.resolveAnimationFrame.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this.enter();
    } else if (this.props.visible && !nextProps.visible) {
      this.leave();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.state.isShow || nextState.isShow);
  }

  componentWillUpdate() {
    setTimeout(this.resolveAnimationFrame, this.props.animationDuration);
  }

  resolveAnimationFrame() {
    // let node = this.refs.dialog;
    // if (e && e.target !== node) {
    //   return;
    // }

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
    console.log(1)
    const { prefixCls, animationType, animationDuration, width, minWidth, isRadius, isRound, className, onMaskClick, children } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const classes = {
      modal: classnames({
        [`${prefixCls}`]: true,
        radius: ('radius' in this.props || isRadius),
        round: ('round' in this.props || isRound),
        [`fade-${animationState}`]: isPending,
        [className]: !!className,
      }),
      dialog: classnames({
        [`${prefixCls}-dialog`]: true,
        [`${animationType}-${animationState}`]: true,
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
      <div className={classes.modal} style={style.modal} onClick={onMaskClick}>
        <div className={`${prefixCls}-wrapper`}>
          <div className={classes.dialog} style={style.dialog} onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </div>
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
  isRound: PropTypes.bool,
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
  isRound: false,
  onMaskClick: () => {},
};

export default Modal;

