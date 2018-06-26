import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Events from '../utils/events';
import Mask from '../mask';
import Portal from './Portal';

const IS_REACT_16 = !!(ReactDOM as any).createPortal;
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
  private container;
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
    this.renderPopup();
    Events.on(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.on(this.popup, 'transitionend', this.animationEnd);
  }

  componentDidUpdate() {
    this.renderPopup();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isShow !== nextProps.visible) {
      clearTimeout(this.timer);

      if (nextProps.visible) {
        this.enter(nextProps);
      } else {
        this.leave();
      }
    }
  }

  componentWillUnmount() {
    Events.off(this.popup, 'webkitTransitionEnd', this.animationEnd);
    Events.off(this.popup, 'transitionend', this.animationEnd);
    if (!IS_REACT_16) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
    document.body.removeChild(this.container);
    this.container = null;
  }

  renderPopup() {
    if (IS_REACT_16) {
      return;
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.getComponent(),
      this.getContainer(),
    );
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

  animationEnd = (e) => {
    // 防止其他的样式转换触发该事件，如border、background-image
    if (!(/transform/i.test(e.propertyName))) {
      return;
    }

    const { onClose, onOpen } = this.props;
    const { animationState } = this.state;

    if (animationState === 'leave') {
      this.setState({
        isMaskShow: false,
      });
      if (typeof onClose === 'function') {
        onClose();
      }
    } else {
      if (typeof onOpen === 'function') {
        onOpen();
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

  getContainer() {
    // let container = document.querySelector(`#${this.props.prefixCls}-container`);
    if (!this.container) {
      let container = document.createElement('div');
      container.classList.add('popup-container');
      document.body.appendChild(container);
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
      <div className={popupCls} ref={(popup) => { this.popup = popup; }}>
        <div className={wrapCls} style={wrapStyle}>
          {children}
        </div>
        {this.renderMask()}
      </div>
    );
  }

  renderPortal() {
    if (!IS_REACT_16) {
      return null;
    }

    const portal = (
      <Portal getContainer={() => this.getContainer()}>
        {this.getComponent()}
      </Portal>
    );

    return portal;
  }

  render() {
    return this.renderPortal();
  }
}
