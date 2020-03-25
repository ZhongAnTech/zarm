import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Popup from '../popup';

const getParent = (props) => {
  if (props) {
    const { getContainer } = props;
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
  return document.body;
};

export interface ToastProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Toast extends Component<ToastProps, any> {
  static hideHelper: () => void;

  private static zarmToast: HTMLDivElement | null;

  private static toastContainer: HTMLElement;

  static show = (
    content: ReactNode | ToastProps,
  ) => {
    Toast.unmountNode();
    if (!Toast.zarmToast) {
      Toast.zarmToast = document.createElement('div');
      Toast.zarmToast.classList.add('toast-container');
      Toast.toastContainer = getParent(content);
      Toast.toastContainer.appendChild(Toast.zarmToast);
    }
    Promise.resolve().then(() => {
      if (Toast.zarmToast) {
        const contentIsReactNode = React.isValidElement(content) || (content && typeof content !== 'object') || !content;
        const props = contentIsReactNode
          ? { ...Toast.defaultProps, ...{ visible: true, getContainer: Toast.zarmToast, content } }
          : { ...Toast.defaultProps, ...content as ToastProps, ...{ visible: true, getContainer: Toast.zarmToast } };
        ReactDOM.render(
          <Toast {...props} />,
          Toast.zarmToast,
        );
      }
    });
  };

  static hide = () => {
    if (Toast.hideHelper) {
      Toast.hideHelper();
    }
  };

  static unmountNode = () => {
    const { zarmToast } = Toast;
    if (zarmToast) {
      ReactDOM.render(<></>, zarmToast);
      Toast.toastContainer.removeChild(zarmToast);
      Toast.zarmToast = null;
    }
  };

  private timer;

  static defaultProps = {
    prefixCls: 'za-toast',
    visible: false,
    stayTime: 3000,
    mask: false,
    destroy: true,
  };

  state = {
    visible: this.props.visible,
  };

  componentDidMount() {
    Toast.hideHelper = this._hide;
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
        clearTimeout(this.timer);
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
      Toast.toastContainer.removeChild(Toast.zarmToast);
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
      content,
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
          <div className={`${prefixCls}__container`}>{content}</div>
        </div>
      </Popup>
    );
  }
}
