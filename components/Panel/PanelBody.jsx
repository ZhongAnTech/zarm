
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class PanelBody extends Component {

  render () { 
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'ui-panel-body': true,
      [className]    : !!className
    });
    
    return <div {...others} className={cls}>{children}</div>;
  }

}

export default PanelBody;