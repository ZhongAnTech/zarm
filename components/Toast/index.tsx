import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Mask from '../mask';

export interface ToastProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Toast extends PureComponent<ToastProps, any> {
  static defaultProps = {
    prefixCls: 'za-toast',
    visible: false,
    stayTime: 3000,
    mask: false,
  };

  static show = (children: any, stayTime?: number, onClose?: () => void) => {
    ReactDOM.render(
      <Toast visible stayTime={stayTime} onClose={onClose}>{children}</Toast>
    , window.zarmToast);
  }

  static hide = () => {
    ReactDOM.render(<Toast visible={false} />, window.zarmToast);
  }

  private timer: number;

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.enter(this.props);
    }
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
    clearTimeout(this.timer);
  }

  enter = (props) => {
    const { stayTime, onMaskClick } = props;

    this.setState({
      visible: true,
    });

    if (stayTime === 0) {
      return;
    }

    this.timer = setTimeout(() => {
      if (typeof onMaskClick === 'function') {
        onMaskClick();
      }
      this.leave();
      clearTimeout(this.timer);
    }, stayTime);
  }

  leave = () => {
    this.setState({
      visible: false,
    });

    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  render() {
    const { prefixCls, className, mask, onMaskClick, children } = this.props;
    const { visible } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`${prefixCls}-open`]: visible,
    });

    return (
      <div className={cls}>
        <div className={`${prefixCls}-container`}>
          {children}
        </div>
        {mask && <Mask type="transparent" onClose={onMaskClick} />}
      </div>
    );
  }
}

if (typeof window !== 'undefined') {
  if (!window.zarmToast) {
    window.zarmToast = document.createElement('div');
    document.body.appendChild(window.zarmToast);
  }

  ReactDOM.render(<Toast visible={false} />, window.zarmToast);
}
