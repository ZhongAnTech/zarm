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

  private popup: HTMLDivElement | null;

  private _container: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isPending: false,
      animationState: 'leave',
      mounted: false,
    };
  }

  componentDidMount() {
    const { visible } = this.props;
    if (visible) {
      this.showPortal();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;
    if (nextProps.visible !== visible) {
      nextProps.visible === true ? this.showPortal() : this.leave();
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
      document.body.removeChild(this._container);
    }
  }

  animationEnd = (e) => {
    e.stopPropagation();

    const { afterClose, afterOpen, handlePortalUnmount } = this.props;
    const { animationState } = this.state;

    if (animationState === 'leave') {
      this.setState({
        isShow: false,
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
    const { mask, maskType, animationDuration } = this.props;
    const { animationState, isShow } = this.state;
    const maskCls = classnames({
      [`za-fade-${animationState}`]: isShow,
    });

    const maskStyle: CSSProperties = {
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };

    return mask && (
      <Mask
        className={maskCls}
        style={maskStyle}
        visible={isShow}
        type={maskType}
        onClick={(e) => { this.handleMaskClick(e); }}
      />
    );
  };

  createContainer = () => {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className += 'popup-container';
      document.body.appendChild(this._container);
    }
    return this._container;
  };

  getComponent = () => {
    const { prefixCls, className, animationType, animationDuration, direction, mask, children, width } = this.props;
    const { isShow, animationState, isPending } = this.state;

    const cls = {
      wrapper: classnames(`${prefixCls}__wrapper`, className, {
        [`za-fade-${animationState}`]: direction === 'center' && isPending,
      }),
      popup: classnames(prefixCls, {
        [`${prefixCls}--${direction}`]: !!direction,
        [`${prefixCls}--nomask`]: direction === 'center' && !mask,
        [`${prefixCls}--hidden`]: animationState === 'leave',
        [`za-${animationType}-${animationState}`]: direction === 'center' && isPending,
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

    if (direction === 'center' && !isShow) {
      popupStyle.display = 'none';
    }

    if (!mask) {
      return (
        <div
          className={cls.popup}
          style={popupStyle}
          role="dialog"
          ref={(popup) => { this.popup = popup; }}
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
        ref={(popup) => { this.popup = popup; }}
      >
        <div className={cls.popup} style={popupStyle} role="document">
          {children}
        </div>
        {this.renderMask()}
      </div>
    );
  };

  handleMaskClick = (e) => {
    e.stopPropagation();
    const { onMaskClick } = this.props;
    if (typeof onMaskClick === 'function') {
      onMaskClick();
    }
  };

  showPortal() {
    this.createContainer();
    this.setState({
      mounted: true,
    }, () => {
      Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
      Events.on(this.popup, 'transitionend', this.animationEnd);
      Events.on(this.popup, 'webkitAnimationEnd', this.animationEnd);
      Events.on(this.popup, 'animationend', this.animationEnd);
      this.enterTimer = setTimeout(() => { this.enter(); }, 0);
    });
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

  renderPortal = (): ReactPortal | null => {
    if (!IS_REACT_16) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getComponent(), this._container);
      return null;
    }
    return ReactDOM.createPortal(this.getComponent(), this._container);
  };

  render() {
    const { mounted } = this.state;
    if (!mounted) {
      return null;
    }
    return this.renderPortal();
  }
}
