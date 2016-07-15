
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Panel extends Component {

  render () {
    const props = this.props;
    const { isRadius, theme, className, children, ...others } = props;

    const cls = classnames({
      'ui-panel'        : true,
      'radius'          : ('radius' in props || isRadius),
      [`theme-${theme}`]: !!theme,
      [className]       : !!className
    });
    
    return <div {...others} className={cls}>{children}</div>;
  }

}

Panel.propTypes = {
  theme     : PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius  : PropTypes.bool,
};

Panel.defaultProps = {
  theme     : 'default',
  isRadius  : false,
};

export default Panel;