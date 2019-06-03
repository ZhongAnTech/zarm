import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Popup from '../popup';

export interface ToastProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Toast extends Component<ToastProps, any> {
  static defaultProps = {
    prefixCls: 'za-toast',
    visible: false,
    stayTime: 3000,
    mask: true,
  };

  static show = (children: any, stayTime?: number, mask?: boolean, onClose?: () => void) => {
    if (!Toast.mounted) {
      Toast.zarmToast = document.createElement('div');
      document.body.appendChild(Toast.zarmToast);
      Toast.mounted = true;
    }
    if (Toast.zarmToast) {
      ReactDOM.render(
        <Toast visible stayTime={stayTime} mask={mask} onClose={onClose}>
          {children}
        </Toast>,
        Toast.zarmToast,
      );
    }
  };

  static hide = (onClose?: () => void) => {
    if (Toast.zarmToast) {
      ReactDOM.render(<Toast visible={false} onClose={onClose} />, Toast.zarmToast);
    }
  };

  private static zarmToast: null | HTMLDivElement;

  private static mounted: boolean = false;

  onClose = () => {
    const { onClose } = this.props;
    if (Toast.zarmToast) {
      Toast.mounted = false;
      document.body.removeChild(Toast.zarmToast);
      Toast.zarmToast = null;
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  render() {
    const { prefixCls, visible, className, stayTime, children, ...others } = this.props;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--open`]: visible,
    });

    // return (
    //   <div className={cls}>
    //     <div className={`${prefixCls}__container`}>{children}</div>
    //     {mask && <Mask visible={visible} type="transparent" onClick={onMaskClick} />}
    //   </div>
    // );

    return (
      <Popup
        visible={visible}
        direction="center"
        maskType="transparent"
        autoClose={stayTime !== 0}
        stayTime={stayTime}
        width="70%"
        {...others}
        onClose={this.onClose}
      >
        <div className={cls}>
          <div className={`${prefixCls}__container`}>{children}</div>
        </div>
      </Popup>
    );
  }
}
