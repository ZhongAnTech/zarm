import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import classnames from 'classnames';
import PropsType from './PropsType';
import Modal from '../modal';

export interface ConfirmProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Confirm extends PureComponent<ConfirmProps, {}> {
  static defaultProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    message: '',
  };

  // static show = (props) => {
  //   ReactDOM.render(<Confirm {...props} visible />, window.zarmConfirm);
  // }

  // static hide = () => {
  //   ReactDOM.render(<Confirm visible={false} />, window.zarmConfirm);
  // }

  render() {
    const { prefixCls, className, title, message, okText, cancelText, onOk, onCancel, locale, ...others } = this.props;
    const cls = classnames(prefixCls, className);

    return (
      <Modal className={cls} {...others}>
        <Modal.Header title={title} />
        <Modal.Body className={`${prefixCls}-body`}>
          {message}
        </Modal.Body>
        <Modal.Footer className={`${prefixCls}-footer`}>
          <a className={`${prefixCls}-footer-button block`} onClick={onCancel}>{cancelText || locale.cancelText}</a>
          <a className={`${prefixCls}-footer-button block ${prefixCls}-footer-button-ok`} onClick={onOk}>
            {okText || locale.okText}
          </a>
        </Modal.Footer>
      </Modal>
    );
  }
}

// if (typeof window !== 'undefined') {
//   if (!window.zarmConfirm) {
//     window.zarmConfirm = document.createElement('div');
//     document.body.appendChild(window.zarmConfirm);
//   }

//   ReactDOM.render(<Confirm visible={false} />, window.zarmConfirm);
// }
