import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
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

  static show = (props) => {
    ReactDOM.render(<Alert {...props} visible />, window.zarmAlert);
  }

  static hide = () => {
    ReactDOM.render(<Alert visible={false} />, window.zarmAlert);
  }

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

if (!window.zarmAlert) {
  window.zarmAlert = document.createElement('div');
  document.body.appendChild(window.zarmAlert);
}

ReactDOM.render(<Alert visible={false} />, window.zarmAlert);
