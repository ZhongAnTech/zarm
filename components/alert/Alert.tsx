import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';

export interface AlertProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Alert extends PureComponent<AlertProps, {}> {
  static defaultProps = {
    prefixCls: 'za-alert',
    animationType: 'zoom',
    message: '',
  };

  // static show = (props) => {
  //   ReactDOM.render(<Alert {...props} visible />, window.zarmAlert);
  // }

  // static hide = () => {
  //   ReactDOM.render(<Alert visible={false} />, window.zarmAlert);
  // }

  render() {
    const { prefixCls, className, title, message, cancelText, onCancel, locale, ...others } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <Modal className={cls} {...others}>
        <Modal.Header title={title} />
        <Modal.Body className={`${prefixCls}__body`}>{message}</Modal.Body>
        <Modal.Footer className={`${prefixCls}__footer`}>
          <div className={`${prefixCls}__footer__button`} onClick={onCancel}>{cancelText || locale!.cancelText}</div>
        </Modal.Footer>
      </Modal>
    );
  }
}

// if (typeof window !== 'undefined') {
//   if (!window.zarmAlert) {
//     window.zarmAlert = document.createElement('div');
//     document.body.appendChild(window.zarmAlert);
//   }

//   ReactDOM.render(<Alert visible={false} />, window.zarmAlert);
// }
