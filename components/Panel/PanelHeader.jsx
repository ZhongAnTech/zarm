
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

class PanelHeader extends Component {

  render () { 
    const { className, children, ...others } = this.props;

    const cls = classnames({
      'ui-panel-header': true,
      [className]      : !!className
    });
    
    return <div {...others} className={cls}>{children}</div>;
  }

}

export default PanelHeader;