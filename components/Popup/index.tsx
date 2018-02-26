import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Events from '../utils/events';
import Mask from '../Mask';
import RenderInBody from './RenderInBody';

export interface PopupProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Popup extends PureComponent<PopupProps, any> {

  static defaultProps = {
    prefixCls: 'za-popup',
    visible: false,
    mask: true,
    direction: 'bottom',
    autoClose: false,
    stayTime: 3000,
    animationDuration: 200,
    maskType: Mask.defaultProps.type,
  };

  private timer: number;
  private popup;

  constructor(props) {
    super(props);
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

    if (stayTime > 0 && autoClose) {
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
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  renderMask = () => {
    const { mask, maskType, onMaskClick, animationDuration } = this.props;
    const { isPending, animationState, isMaskShow } = this.state;

    const maskCls = classnames({
      [`fade-${animationState}`]: isPending,
    });

    const maskStyle = {
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };

    return mask && (
      <Mask
        className={maskCls}
        style={maskStyle}
        visible={isMaskShow}
        type={maskType}
        onClose={onMaskClick}
      />
    );
  }

  render() {
    const { prefixCls, className, animationDuration, direction, children } = this.props;
    const { isShow } = this.state;

    const popupCls = classnames(`${prefixCls}`, className, {
      [`${prefixCls}-hidden`]: !isShow,
    });
    const wrapCls = classnames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-${direction}`);

    const wrapStyle = {
      WebkitTransitionDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
    };

    return (
      <RenderInBody>
        <div className={popupCls} ref={(popup) => { this.popup = popup; }}>
          <div className={wrapCls} style={wrapStyle}>
            {children}
          </div>
          {this.renderMask()}
        </div>
      </RenderInBody>
    );
  }
}
