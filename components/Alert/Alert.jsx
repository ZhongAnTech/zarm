import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Button from '../Button';

class Alert extends PureComponent {

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

Alert.propTypes = {
  prefixCls: PropTypes.string,
  animationType: Modal.propTypes.animationType,
  message: PropTypes.string,
  cancelText: PropTypes.string,
  onCancel: PropTypes.func,
};

Alert.defaultProps = {
  prefixCls: 'za-alert',
  animationType: 'zoom',
  message: '',
  cancelText: '关闭',
};

export default Alert;
