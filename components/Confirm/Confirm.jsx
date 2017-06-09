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
          <Button bordered onClick={onCancel}>{cancelText}</Button>
          <Button bordered theme="info" onClick={onOk}>{okText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Confirm.propTypes = {
  prefixCls: PropTypes.string,
  message: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

Confirm.defaultProps = {
  prefixCls: 'ui-confirm',
  message: '',
  width: '70%',
  okText: '确定',
  cancelText: '取消',
  onOk: () => {},
  onCancel: () => {},
};

export default Confirm;
