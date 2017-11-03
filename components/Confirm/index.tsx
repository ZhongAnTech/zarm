import React, { PureComponent } from 'react';
import { ConfirmProps } from './PropsType';
import Modal from '../Modal';
import Button from '../Button';

export { ConfirmProps };

export default class Confirm extends PureComponent<ConfirmProps, {}> {

  static defaultProps = {
    prefixCls: 'za-confirm',
    animationType: 'zoom',
    message: '',
    okText: '确定',
    cancelText: '取消',
  };

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
