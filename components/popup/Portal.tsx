import React, { Component, CSSProperties, ReactPortal } from 'react';
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

  private timer: number;

  private popup;

  private _container;

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isMaskShow: false,
      isPending: false,
      animationState: 'enter',
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
    if (nextProps.visible === true && nextProps.visible !== visible) {
      this.showPortal();
    }

    if (nextProps.visible === false && nextProps.visible !== visible) {
      this.leave();
    }
  }

  componentWillUnmount() {
    if (this.popup) {
      Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
      Events.off(this.popup, 'transitionend', this.animationEnd);
    }
  }

  showPortal = () => {
    this.createContainer();
    this.setState({
      mounted: true,
    }, () => {
      Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
      Events.on(this.popup, 'transitionend', this.animationEnd);
      setTimeout(() => { this.enter(); }, 0);
    });
  };

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
  };

  leave = () => {
    this.setState({
      isShow: false,
      isPending: true,
      animationState: 'leave',
    });
  };

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
        document.body.removeChild(this._container);
      }
    } else if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  renderMask = () => {
    const { mask, maskType, animationDuration } = this.props;
    const { isPending, animationState, isMaskShow } = this.state;

    const maskCls = classnames({
      [`fade-${animationState}`]: isPending,
    });

    const maskStyle: CSSProperties = {
      WebkitAnimationDuration: `${animationDuration}ms`,
      animationDuration: `${animationDuration}ms`,
    };

    return mask && (
      <Mask
        className={maskCls}
        style={maskStyle}
        visible={isMaskShow}
        type={maskType}
        onClick={(e) => { this.handleMaskClick(e); }}
      />
    );
  };

  createContainer = () => {
    if (!this._container) {
      this._container = document.createElement('div');
      this._container.className += ' popup-container';
      document.body.appendChild(this._container);
    }
    return this._container;
  };

  getComponent = () => {
    const { prefixCls, className, animationDuration, direction, mask, children } = this.props;
    const { isShow } = this.state;

    const popupCls = classnames(prefixCls, className, {
      [`${prefixCls}--${direction}`]: !!direction,
      [`${prefixCls}--mask`]: mask,
      [`${prefixCls}--hidden`]: !isShow,
    });

    const wrapStyle = {
      WebkitTransitionDuration: `${animationDuration}ms`,
      transitionDuration: `${animationDuration}ms`,
    };

    return (
      <div
        className={popupCls}
        ref={(popup) => { this.popup = popup; }}
      >
        <div className={`${prefixCls}__wrapper`} style={wrapStyle}>
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
