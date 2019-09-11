import React, { PureComponent, CSSProperties, ReactPortal } from 'react';
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

export default class Portal extends PureComponent<PortalProps, any> {
  static defaultProps = {
    prefixCls: 'za-popup',
    visible: false,
    mask: true,
    direction: 'bottom',
    animationType: 'fade',
    animationDuration: 200,
    maskType: Mask.defaultProps.type,
  };

  private enterTimer: number;

  // private wrapper: HTMLDivElement | null;

  private popup: HTMLDivElement | null;

  private parent: HTMLElement;

  private _container: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      // isShow: false,
      isPending: false,
      // animationState: 'leave',
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

  getParent() {
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
  }

  animationEnd = (e) => {
    e.stopPropagation();
    const { afterClose, afterOpen, handlePortalUnmount, visible } = this.props;
    const animationState = visible ? 'enter' : 'leave';
    if (animationState === 'leave') {
      this.setState({
        isPending: false,
      });
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
          onClick={(e) => {
            this.handleMaskClick(e);
          }}
        />
      )
    );
  };

  handleMaskClick = (e) => {
    e.stopPropagation();
    const { onMaskClick } = this.props;
    if (typeof onMaskClick === 'function') {
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
      };

    // if (direction === 'center' && !isShow) {
    //   popupStyle.display = 'none';
    // }

    if (!mask) {
      return (
        <div
          className={cls.popup}
          style={popupStyle}
          role="dialog"
          ref={(popup) => {
            this.popup = popup;
          }}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        role="dialog"
        className={cls.wrapper}
        style={wrapStyle}
      >
        <div
          ref={(popup) => {
            this.popup = popup;
          }}
          className={cls.popup}
          style={popupStyle}
          role="document"
        >
          {children}
        </div>
        {this.renderMask()}
      </div>
    );
  };

  handleAnimation() {
    const { visible, prefixCls, animationDuration } = this.props;
    if (visible) {
      if (this.popup) {
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
  }

  // showPortal() {
  //   this.createContainer();
  //   this.setState(
  //     {
  //       mounted: true,
  //     },
  //     () => {
  //       Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
  //       Events.on(this.popup, 'transitionend', this.animationEnd);
  //       Events.on(this.popup, 'webkitAnimationEnd', this.animationEnd);
  //       Events.on(this.popup, 'animationend', this.animationEnd);
  //       this.enterTimer = setTimeout(() => {
  //         this.enter();
  //       }, 0);
  //     },
  //   );
  // }

  // enter() {
  //   this.setState({
  //     isShow: true,
  //     isPending: true,
  //     animationState: 'enter',
  //   });
  // }

  // leave() {
  //   this.setState({
  //     isShow: true,
  //     isPending: true,
  //     animationState: 'leave',
  //   });
  // }

  renderPortal = (): ReactPortal | null => {
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

  createContainer() {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className += 'popup-container';
      this.parent = this.getParent();
      this.parent.appendChild(this._container);
    }
    return this._container;
  }

  render() {
    // const { mounted } = this.state;
    // if (!mounted) {
    //   return null;
    // }
    return this.renderPortal();
  }
}
