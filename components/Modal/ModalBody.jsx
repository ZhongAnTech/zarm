
import React, { Component, PropTypes } from 'react';

class ModalBody extends Component {

  render () {
    const { height, children, ...others } = this.props;
    const bodyStyle = {
      'height' : height,
    }

    return (
      <div className="ui-modal-body" style={bodyStyle} {...others}>
        {children}
      </div>
    );
  }

}

ModalBody.propTypes = { 
  height : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ModalBody.defaultProps = {
  
};

export default ModalBody;

