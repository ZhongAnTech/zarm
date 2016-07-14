
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Icon extends Component {

  render () { 
    const { type, theme, className, ...others } = this.props;
    const cls = classnames({
      'ui-icon'          : true,
      [`ui-icon-${type}`]: !!type,
      [`theme-${theme}`] : !!theme,
      [className]        : !!className
    });
    
    return (
      <i className={cls} {...others} />
    );
  }

}

Icon.propTypes = {
  type : PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
};

Icon.defaultProps = {
  type : '',
  theme: 'default',
};

export default Icon;