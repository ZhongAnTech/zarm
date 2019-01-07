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
    if (!Toast.mounted) {
      document.body.appendChild(Toast.zarmToast);
      Toast.mounted = true;
    }
    ReactDOM.render(
      <Toast visible stayTime={stayTime} onClose={onClose}>
        {children}
      </Toast>,
      Toast.zarmToast,
    );
  }

  static hide = () => {
    ReactDOM.render(<Toast visible={false} />, Toast.zarmToast);
  }

  private static zarmToast: HTMLDivElement = document.createElement('div');
  private static mounted: boolean = false;
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
      this.leave(nextProps);
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
      this.leave(props);
      clearTimeout(this.timer);
    }, stayTime);
  }

  leave = (props) => {
    this.setState({
      visible: false,
    });

    const { onClose } = props;
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
        <div className={`${prefixCls}-container`}>{children}</div>
        {mask && <Mask visible={visible} type="transparent" onClick={onMaskClick} />}
      </div>
    );
  }
}
