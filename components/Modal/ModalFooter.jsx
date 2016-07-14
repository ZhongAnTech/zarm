
import React, { Component, PropTypes, Children } from 'react';

class ModalFooter extends Component {

  render () { 
    const { children, ...others } = this.props; 
    
    return (
      <div className="ui-modal-footer" {...others}>
        {children}
      </div>
    );
  }

}

export default ModalFooter;

