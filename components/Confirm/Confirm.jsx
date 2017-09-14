import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Button from '../Button';

class Confirm extends PureComponent {

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

Confirm.propTypes = {
  prefixCls: PropTypes.string,
  animationType: Modal.propTypes.animationType,
  message: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

Confirm.defaultProps = {
  prefixCls: 'za-confirm',
  animationType: 'zoom',
  message: '',
  okText: '确定',
  cancelText: '取消',
};

export default Confirm;
