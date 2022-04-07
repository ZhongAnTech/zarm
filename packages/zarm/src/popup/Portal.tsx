import React, { PureComponent } from 'react';
import type { CSSProperties, ReactPortal } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import Events from '../utils/events';
import { canUseDOM, getMountContainer } from '../utils/dom';
import Mask from '../mask';
import type { BasePopupProps } from './interface';
import Trigger from '../trigger';

const IS_REACT_16 = !!ReactDOM.createPortal;

export interface PortalProps extends BasePopupProps {
  prefixCls?: string;
  className?: string;
  safeIphoneX?: boolean;
  handlePortalUnmount?: () => void;
}

export interface PortalState {
  isPending: boolean;
}

export default class Portal extends PureComponent<PortalProps, PortalState> {
  private enterTimer: number;

  private mountNode?: HTMLElement;

  private _container: HTMLDivElement | null;

  private _reflow?: number;

  private popup: HTMLDivElement | null;

  static defaultProps: PortalProps = {
    visible: false,
    mask: true,
    direction: 'bottom',
    animationType: 'fade',
    animationDuration: 200,
  };

  constructor(props: PortalProps) {
    super(props);
    this.state = {
      isPending: false,
    };
    if (props.mountContainer !== false && canUseDOM) {
      this.createContainer();
    }
  }

  componentDidMount() {
    if (this.popup) {
      Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
      Events.on(this.popup, 'transitionend', this.animationEnd);
      Events.on(this.popup, 'webkitAnimationEnd', this.animationEnd);
      Events.on(this.popup, 'animationend', this.animationEnd);
    }

    this.handleAnimation();
  }

  componentDidUpdate(prevProps: PortalProps) {
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
    if (this._container && this.mountNode) {
      this.mountNode.removeChild(this._container);
    }
  }

  animationEnd = (e: TransitionEvent | AnimationEvent) => {
    if (e.target !== this.popup) {
      return;
    }
    e.stopPropagation();
    const { afterClose, afterOpen, handlePortalUnmount, visible, prefixCls } = this.props;
    const animationState = visible ? 'enter' : 'leave';
    if (animationState === 'leave') {
      this._container && this._container.classList.add(`${prefixCls}--hidden`);
      if (typeof handlePortalUnmount === 'function') {
        handlePortalUnmount();
      }

      if (typeof afterClose === 'function') {
        afterClose();
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
    return mask && <Mask className={maskCls} style={maskStyle} visible type={maskType} />;
  };

  onEsc = () => {
    const { onEsc } = this.props;
    onEsc && onEsc();
  };

  handleMaskClick = (e) => {
    e.stopPropagation();
    const { onMaskClick } = this.props;
    if (
      typeof onMaskClick === 'function' &&
      this.popup !== e.target &&
      this.popup &&
      !this.popup.contains(e.target)
    ) {
      onMaskClick();
    }
  };

  getComponent = () => {
    const {
      prefixCls,
      animationType,
      animationDuration,
      direction,
      mask,
      children,
      width,
      visible,
      safeIphoneX,
    } = this.props;
    const { isPending } = this.state;
    const animationState = visible ? 'enter' : 'leave';
    const cls = {
      wrapper: classnames(`${prefixCls}__wrapper`, {
        [`za-fade-${animationState}`]: direction === 'center' && isPending,
      }),
      popup: classnames(prefixCls, {
        [`${prefixCls}--${direction}`]: !!direction,
        [`${prefixCls}--safe`]: direction === 'bottom' && safeIphoneX,
        [`${prefixCls}--nomask`]: direction === 'center' && !mask,
        [`za-${animationType}-${animationState}`]: direction === 'center' && isPending,
      }),
    };

    const wrapStyle: CSSProperties =
      direction === 'center'
        ? {
            WebkitAnimationDuration: `${animationDuration}ms`,
            animationDuration: `${animationDuration}ms`,
          }
        : {};

    const popupStyle: CSSProperties =
      direction === 'center'
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
          data-width={this._reflow}
          onClick={this.handleMaskClick}
        >
          <div
            ref={(ref) => {
              this.popup = ref;
            }}
            data-width={this._reflow}
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
        this._container && this._container.classList.remove(`${prefixCls}--hidden`);
        this.setState({ isPending: true });
        this._reflow = this.popup.offsetWidth;
        this.popup.classList.add(`${prefixCls}--show`);
      }
    } else {
      this.setState({ isPending: true });
      if (this.popup) {
        this.popup.classList.remove(`${prefixCls}--show`);
      }
    }
  };

  renderPortal = (): ReactPortal | JSX.Element | null => {
    const { mountContainer, className, prefixCls } = this.props;
    if (!canUseDOM) {
      return null;
    }
    if (mountContainer === false) {
      return (
        <div
          className={classnames([`${prefixCls}-container`, className])}
          ref={(ref) => {
            this._container = ref;
          }}
        >
          {this.getComponent()}
        </div>
      );
    }
    if (this._container) {
      if (!IS_REACT_16) {
        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(), this._container);
        return null;
      }
      return ReactDOM.createPortal(this.getComponent(), this._container);
    }
    return null;
  };

  createContainer = () => {
    const { className = '', prefixCls, mountContainer } = this.props;
    if (mountContainer === false) {
      return;
    }
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className += classnames([`${prefixCls}-container`, className]);
      this.mountNode = getMountContainer(mountContainer);
      this.mountNode.appendChild(this._container);
    }
    return this._container;
  };

  render() {
    const { visible } = this.props;
    return (
      <Trigger visible={visible} onClose={this.onEsc}>
        {this.renderPortal()}
      </Trigger>
    );
  }
}
