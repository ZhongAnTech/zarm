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

  private static zarmToast: null | HTMLDivElement;

  private static mounted: boolean = false;

  static show = (
    children: any,
    stayTime?: number,
    mask?: boolean,
    onClose?: () => void,
  ) => {
    Toast.unmountNode();
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

  static _hide: () => void;

  static hide = () => {
    if (Toast._hide) {
      Toast._hide();
    }
  };

  static unmountNode = () => {
    const { zarmToast } = Toast;
    if (zarmToast) {
      ReactDOM.unmountComponentAtNode(zarmToast);
    }
  };

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Toast._hide = this._hide;
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = this.props;

    if (nextProps.visible !== visible) {
      if (nextProps.visible === true) {
        this.setState({
          visible: true,
        });
      } else {
        this._hide();
      }
    }
  }

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

  _hide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      prefixCls,
      className,
      stayTime,
      children,
      ...others
    } = this.props;

    const { visible } = this.state;

    const cls = classnames(prefixCls, className, {
      // [`${prefixCls}--open`]: visible,
    });

    return (
      <Popup
        direction="center"
        maskType="transparent"
        autoClose={stayTime !== 0}
        stayTime={stayTime}
        width="70%"
        {...others}
        visible={visible}
        onClose={this.onClose}
      >
        <div className={cls}>
          <div className={`${prefixCls}__container`}>{children}</div>
        </div>
      </Popup>
    );
  }
}
