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
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <div className={`${prefixCls}__button`} onClick={onCancel}>{cancelText || locale!.cancelText}</div>
          <div className={`${prefixCls}__button ${prefixCls}__button--ok`} onClick={onOk}>
            {okText || locale!.okText}
          </div>
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
