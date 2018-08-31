import React, { Component, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import Mask from '../mask';
import PropsType from './PropsType';

const IS_REACT_16 = !!ReactDOM.createPortal;
export interface PortalProps extends PropsType {
  prefixCls?: string;
  className?: string;
  handlePortalUnmount?: () => void;
}

export default class Portal extends Component<PortalProps, any> {
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

  private container;
  private timer: number;
  private popup;

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isMaskShow: false,
      isPending: false,
      animationState: 'enter',
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      document.body.appendChild(this.container);
      // const _popupHeight = this.popup.offsetHeight;
      setTimeout(() => {
        this.enter();
      });
    }
    Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.on(this.popup, 'transitionend', this.animationEnd);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === true && nextProps.visible !== this.props.visible) {
      document.body.appendChild(this.container);
      // const _popupHeight = this.popup.offsetHeight; // tslint:disable
      setTimeout(() => {
        this.enter();
      });
    }

    if (nextProps.visible === false && nextProps.visible !== this.props.visible) {
      this.leave();
    }
  }

  componentWillUnmount() {
    Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.off(this.popup, 'transitionend', this.animationEnd);
  }

  enter = () => {
    const { stayTime, autoClose, onMaskClick } = this.props;
    this.setState({
      isShow: true,
      isMaskShow: true,
      isPending: true,
      animationState: 'enter',
    });

    if ((stayTime as number) > 0 && autoClose) {
      this.timer = setTimeout(() => {
        if (typeof onMaskClick === 'function') {
          onMaskClick();
        }
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

  animationEnd = (e) => {
    // 防止其他的样式转换触发该事件，如border、background-image
    if (!/transform/i.test(e.propertyName)) {
      return;
    }

    const { onClose, onOpen, handlePortalUnmount } = this.props;
    const { animationState } = this.state;

    if (animationState === 'leave') {
      this.setState({
        isMaskShow: false,
      });
      if (typeof onClose === 'function') {
        onClose();
      }
      if (typeof handlePortalUnmount === 'function') {
        handlePortalUnmount();
        document.body.removeChild(this.container);
      }
    } else if (typeof onOpen === 'function') {
      onOpen();
    }
  }

  renderMask = () => {
    const { mask, maskType, onMaskClick, animationDuration } = this.props;
    const { isPending, animationState, isMaskShow } = this.state;

    const maskCls = classnames({
      [`fade-${animationState}`]: isPending,
    });

    const maskStyle: CSSProperties = {
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };

    return mask &&
      <Mask className={maskCls} style={maskStyle} visible={isMaskShow} type={maskType} onClick={onMaskClick} />;
  }

  getContainer() {
    if (!this.container) {
      const container = document.createElement('div');
      container.classList.add('popup-container');
      this.container = container;
    }
    return this.container;
  }

  getComponent() {
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
      <div
        className={popupCls}
        ref={(popup) => { this.popup = popup; }}
      >
        <div className={wrapCls} style={wrapStyle}>
          {children}
        </div>
        {this.renderMask()}
      </div>
    );
  }

  renderPortal() {
    if (!IS_REACT_16) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(), this.getContainer());
      return null;
    }
    return ReactDOM.createPortal(this.getComponent(), this.getContainer());
  }

  render() {
    return this.renderPortal();
  }
}
