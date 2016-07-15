
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class PanelTitle extends Component {

  render () { 
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'ui-panel-title': true,
      [className]     : !!className
    });
    
    return <div {...others} className={cls}>{children}</div>;
  }

}

export default PanelTitle;