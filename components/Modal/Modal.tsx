import React, { PureComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import { BaseModalProps } from './PropsType';
import Events from '../utils/events';
import Mask from '../Mask';

const stopPropagation = (e) => {
  e.stopPropagation();
  // e.nativeEvent.stopImmediatePropagation();
};

export interface ModalProps extends BaseModalProps {
  prefixCls?: string;
  className?: string;
}

export default class Modal extends PureComponent<ModalProps, any> {

  static Header: any;
  static Body: any;
  static Footer: any;
  static defaultProps = {
    prefixCls: 'za-modal',
    visible: false,
    animationType: 'fade',
    animationDuration: 200,
    width: '70%',
  };

  private modal;

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
    Events.on(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.on(this.modal, 'animationend', this.animationEnd);
  }

  componentWillUnmount() {
    Events.off(this.modal, 'webkitAnimationEnd', this.animationEnd);
    Events.off(this.modal, 'animationend', this.animationEnd);
  }

  animationEnd = () => {
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

  enter = () => {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'enter',
    });
  }

  leave = () => {
    this.setState({
      isShow: true,
      isPending: true,
      animationState: 'leave',
    });
  }

  render() {
    const { prefixCls, className, shape, animationType, animationDuration, width, onMaskClick, children } = this.props;
    const { isShow, isPending, animationState } = this.state;

    const cls = {
      modal: classnames(`${prefixCls}`, className, {
        [`shape-${shape}`]: !!shape,
        [`fade-${animationState}`]: isPending,
      }),
      dialog: classnames(`${prefixCls}-dialog`, {
        [`${animationType}-${animationState}`]: isPending,
        [`fade-${animationState}`]: isPending,
      }),
      // mask: classnames({
      //   [`fade-${animationState}`]: isPending,
      // }),
    };

    const modalStyle: CSSProperties = {
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };

    const dialogStyle: CSSProperties = {
      width,
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };

    // const maskStyle: CSSProperties = {
    //   WebkitAnimationDuration: `${animationDuration}ms`,
    //   MozAnimationDuration: `${animationDuration}ms`,
    //   msAnimationDuration: `${animationDuration}ms`,
    //   OAnimationDuration: `${animationDuration}ms`,
    //   animationDuration: `${animationDuration}ms`,
    // };

    if (!isShow) {
      modalStyle.display = 'none';
    }

    return (
      <div className={cls.modal} style={modalStyle} ref={(ele) => { this.modal = ele; }}>
        <div className={`${prefixCls}-wrapper`}>
          <div className={cls.dialog} style={dialogStyle} onClick={stopPropagation}>
            {children}
          </div>
        </div>
        <Mask
          visible={isShow}
          // className={cls.mask}
          // style={maskStyle}
          onClose={onMaskClick}
        />
      </div>
    );
  }
}
