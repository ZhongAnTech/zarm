import React, { PureComponent, CSSProperties, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import Mask from '../mask';
import PropsType from './PropsType';

const IS_REACT_16 = !!ReactDOM.createPortal;

function canUseDOM() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export interface PortalProps extends PropsType {
  prefixCls?: string;
  className?: string;
  handlePortalUnmount?: () => void;
}

export default class Portal extends PureComponent<PortalProps, any> {
  private enterTimer: number;

  private parent: HTMLElement;

  private _container: HTMLDivElement;

  private popup: HTMLDivElement | null;

  static defaultProps = {
    prefixCls: 'za-popup',
    visible: false,
    mask: true,
    direction: 'bottom',
    animationType: 'fade',
    animationDuration: 200,
    maskType: Mask.defaultProps.type,
  };

  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
    };
    this.createContainer();
  }

  componentDidMount() {
    Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.on(this.popup, 'transitionend', this.animationEnd);
    Events.on(this.popup, 'webkitAnimationEnd', this.animationEnd);
    Events.on(this.popup, 'animationend', this.animationEnd);
    this.handleAnimation();
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;
    if (prevProps.visible !== visible) {
      this.handleAnimation();
    }
  }

  componentWillUnmount() {
    if (this.popup) {
      Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
      Events.off(this.popup, 'transitionend', this.animationEnd);
      Events.off(this.popup, 'webkitAnimationEnd', this.animationEnd);
      Events.off(this.popup, 'animationend', this.animationEnd);
    }

    clearTimeout(this.enterTimer);
    if (this._container) {
      this.parent.removeChild(this._container);
    }
  }

  getParent = () => {
    const { getContainer } = this.props;
    if (getContainer) {
      if (typeof getContainer === 'function') {
        return getContainer();
      }
      if (
        typeof getContainer === 'object'
        && getContainer instanceof HTMLElement
      ) {
        return getContainer;
      }
    }
    return document.body;
  };

  animationEnd = (e) => {
    if (e.target !== this.popup) {
      return;
    }
    e.stopPropagation();
    const { afterClose, afterOpen, handlePortalUnmount, visible, prefixCls } = this.props;
    const animationState = visible ? 'enter' : 'leave';
    if (animationState === 'leave') {
      this._container.classList.add(`${prefixCls}--hidden`);
      if (typeof afterClose === 'function') {
        afterClose();
      }
      if (typeof handlePortalUnmount === 'function') {
        handlePortalUnmount();
      }
    } else if (typeof afterOpen === 'function') {
      afterOpen();
    }
  };

  renderMask = () => {
    const { mask, maskType, animationDuration, visible } = this.props;
    const { isPending } = this.state;
    const animationState = visible ? 'enter' : 'leave';
    const maskCls = classnames({
      [`za-fade-${animationState}`]: isPending,
    });

    const maskStyle: CSSProperties = {
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };
    return (
      mask && (
        <Mask
          className={maskCls}
          style={maskStyle}
          visible
          type={maskType}
        />
      )
    );
  };

  handleMaskClick = (e) => {
    e.stopPropagation();
    const { onMaskClick } = this.props;
    if (typeof onMaskClick === 'function' && this.popup !== e.target && this.popup && !this.popup.contains(e.target)) {
      onMaskClick();
    }
  };

  getComponent = () => {
    const {
      prefixCls,
      className,
      animationType,
      animationDuration,
      direction,
      mask,
      children,
      width,
      visible,
    } = this.props;
    const { isPending } = this.state;
    const animationState = visible ? 'enter' : 'leave';

    const cls = {
      wrapper: classnames(`${prefixCls}__wrapper`, className, {
        [`za-fade-${animationState}`]: direction === 'center' && isPending,
      }),
      popup: classnames(prefixCls, {
        [`${prefixCls}--${direction}`]: !!direction,
        [`${prefixCls}--nomask`]: direction === 'center' && !mask,
        [`za-${animationType}-${animationState}`]:
          direction === 'center' && isPending,
      }),
    };

    const wrapStyle: CSSProperties = direction === 'center'
      ? {
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      }
      : {};

    const popupStyle: CSSProperties = direction === 'center'
      ? {
        width,
        WebkitAnimationDuration: `${animationDuration}ms`,
        animationDuration: `${animationDuration}ms`,
      }
      : {
        WebkitTransitionDuration: `${animationDuration}ms`,
        transitionDuration: `${animationDuration}ms`,
        WebkitTransitionProperty: 'transform',
        transitionProperty: 'transform',
      };

    if (!mask) {
      return (
        <div
          className={cls.popup}
          style={popupStyle}
          role="dialog"
          ref={(ref) => {
            this.popup = ref;
          }}
        >
          {children}
        </div>
      );
    }

    return (
      <>
        {this.renderMask()}
        <div
          role="dialog"
          className={cls.wrapper}
          style={wrapStyle}
          onClick={(e) => {
            this.handleMaskClick(e);
          }}
        >
          <div
            ref={(ref) => {
              this.popup = ref;
            }}
            className={cls.popup}
            style={popupStyle}
            role="document"
          >
            {children}
          </div>
        </div>
      </>
    );
  };

  handleAnimation = () => {
    const { visible, prefixCls } = this.props;
    if (visible) {
      if (this.popup) {
        this._container.classList.remove(`${prefixCls}--hidden`);
        this.setState({
          isPending: true,
        });
        this.popup.focus();
        this.popup.classList.add(`${prefixCls}--show`);
      }
    } else {
      this.setState({
        isPending: true,
      });
      this.popup!.classList.remove(`${prefixCls}--show`);
    }
  };

  renderPortal = (): ReactPortal | null => {
    if (!canUseDOM()) {
      return null;
    }
    if (!IS_REACT_16) {
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        this.getComponent(),
        this._container,
      );
      return null;
    }
    return ReactDOM.createPortal(this.getComponent(), this._container);
  };

  createContainer = () => {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className += 'popup-container';
      this.parent = this.getParent();
      this.parent.appendChild(this._container);
    }
    return this._container;
  };

  render() {
    return this.renderPortal();
  }
}
