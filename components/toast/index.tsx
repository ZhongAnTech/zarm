import React, { Component, ReactNode } from 'react';
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
    mask: false,
  };

  private static zarmToast: null | HTMLDivElement;

  static show = (
    children: ReactNode,
    stayTime?: number,
    mask?: boolean,
    afterClose?: () => void,
  ) => {
    Toast.unmountNode();
    if (!Toast.zarmToast) {
      Toast.zarmToast = document.createElement('div');
      document.body.appendChild(Toast.zarmToast);
    }

    if (Toast.zarmToast) {
      ReactDOM.render(
        <Toast visible stayTime={stayTime} mask={mask} afterClose={afterClose}>
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

  private timer;

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Toast._hide = this._hide;
    this.autoClose();
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      if (visible === true) {
        // eslint-disable-next-line
        this.setState({
          visible: true,
        });
        this.autoClose();
      } else {
        this._hide();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  afterClose = () => {
    const { afterClose } = this.props;
    if (Toast.zarmToast) {
      document.body.removeChild(Toast.zarmToast);
      Toast.zarmToast = null;
    }

    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  _hide = () => {
    this.setState({
      visible: false,
    });
  };

  autoClose() {
    const { stayTime } = this.props;
    if ((stayTime as number) > 0) {
      this.timer = setTimeout(() => {
        this._hide();
        clearTimeout(this.timer);
      }, stayTime);
    }
  }

  render() {
    const {
      prefixCls,
      className,
      stayTime,
      children,
      ...others
    } = this.props;

    const { visible } = this.state;

    const cls = classnames(prefixCls, className);

    return (
      <Popup
        direction="center"
        maskType="transparent"
        width="70%"
        {...others}
        visible={visible}
        afterClose={this.afterClose}
      >
        <div className={cls}>
          <div className={`${prefixCls}__container`}>{children}</div>
        </div>
      </Popup>
    );
  }
}
