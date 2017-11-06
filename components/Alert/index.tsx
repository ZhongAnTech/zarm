import React, { PureComponent } from 'react';
import PropsType from './PropsType';
import Modal from '../Modal';
import Button from '../Button';

export interface AlertProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Alert extends PureComponent<AlertProps, {}> {

  static defaultProps = {
    prefixCls: 'za-alert',
    animationType: 'zoom',
    message: '',
    cancelText: '关闭',
  };

  render() {
    const { prefixCls, title, message, cancelText, onCancel, ...others } = this.props;

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
        </Modal.Footer>
      </Modal>
    );
  }
}
