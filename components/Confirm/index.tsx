import React, { PureComponent } from 'react';
// import ReactDOM from 'react-dom';
import PropsType from './PropsType';
import Modal from '../Modal';
import Button from '../Button';

export interface ConfirmProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Confirm extends PureComponent<ConfirmProps, {}> {

  static defaultProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    message: '',
    okText: '确定',
    cancelText: '取消',
  };

  // static show = (props) => {
  //   ReactDOM.render(<Confirm {...props} visible />, window.zarmConfirm);
  // }

  // static hide = () => {
  //   ReactDOM.render(<Confirm visible={false} />, window.zarmConfirm);
  // }

  render() {
    const { prefixCls, title, message, okText, cancelText, onOk, onCancel, ...others } = this.props;

    return (
      <Modal {...others}>
        <Modal.Header title={title} />
        <Modal.Body>
          <div className={prefixCls}>
            {message}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button block bordered onClick={onCancel}>{cancelText}</Button>
          <Button block bordered theme="primary" onClick={onOk}>{okText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

// if (!window.zarmConfirm) {
//   window.zarmConfirm = document.createElement('div');
//   document.body.appendChild(window.zarmConfirm);
// }

// ReactDOM.render(<Confirm visible={false} />, window.zarmConfirm);
