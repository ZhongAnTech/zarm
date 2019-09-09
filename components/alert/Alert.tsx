import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';
import alertLocale from './locale/zh_CN';
import { getRunTimeLocale } from '../locale-provider/LocaleProvider';

export interface AlertProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Alert extends PureComponent<AlertProps, {}> {
  static defaultProps = {
    prefixCls: 'za-alert',
    animationType: 'zoom',
    message: '',
    locale: alertLocale,
  };

  // private static alertContainer;

  // static show = (props: AlertProps) => {
  //   const { defaultProps } = Alert;
  //   let _props: any;

  //   if (typeof props === 'object') {
  //     _props = { ...defaultProps, ...props };
  //   } else {
  //     _props = { ...defaultProps };
  //   }

  //   const runTimeLocale = getRunTimeLocale();
  //   if (runTimeLocale && runTimeLocale.Alert) {
  //     _props = { ..._props, locale: runTimeLocale.Alert };
  //   }
  //   Alert.alertContainer = document.createElement('div');
  //   document.body.appendChild(Alert.alertContainer);
  //   return new Promise((resolve) => {
  //     ReactDOM.render(
  //       <Alert
  //         {..._props}
  //         visible
  //         onCancel={() => {
  //           if (typeof _props.onCancel === 'function') {
  //             _props.onCancel();
  //           }
  //           resolve(false);
  //         }}
  //       />,
  //       Alert.alertContainer,
  //     );
  //   });
  // };

  // static hide = () => {
  //   if (Alert._hide) {
  //     Alert._hide();
  //   }
  // };

  // static _hide: () => void;

  state = {
    visible: this.props.visible,
  };

  // componentDidMount() {
  //   Alert._hide = this._hide;
  // }

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

  _hide = () => {
    this.setState({
      visible: false,
    });
  };

  afterClose = () => {
    const { afterClose } = this.props;
    // if (Alert.alertContainer) {
    //   document.body.removeChild(Alert.alertContainer);
    //   Alert.alertContainer = null;
    // }

    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  render() {
    const { prefixCls, className, message, cancelText, onCancel, locale, ...others } = this.props;
    const { visible } = this.state;
    const cls = classnames(prefixCls, className);

    return (
      <Modal
        className={cls}
        {...others}
        visible={visible}
        afterClose={this.afterClose}
        footer={<div className={`${prefixCls}__button`} onClick={onCancel}>{cancelText || locale!.cancelText}</div>}
      >
        {message}
      </Modal>
    );
  }
}
