
import React, { Component, PropTypes } from 'react';
import Modal from './Modal';

class Alert extends Component {

  render () {
    const { message, onClose, ...others } = this.props;
    
    return (
      <Modal {...others}>
        <Modal.Body>
          <p style={{textAlign: 'center'}}>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={onClose}>关闭</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Alert.propTypes = {
  message : PropTypes.string,
  width   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose : PropTypes.func,
};

Alert.defaultProps = {
  message : '',
  width   : 270,
  onClose : function () {},
};

export default Alert;