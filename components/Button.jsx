
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Button extends Component {

  render() {
    const props = this.props;
    const { type, theme, size, isBlock, isRadius, isRound, isActive, isFocus, isDisabled, className, children, ...others } = this.props;

    const classes = classnames({
      'ui-btn'           : true,
      'block'            : ('block' in props || isBlock),
      'radius'           : ('radius' in props || isRadius),
      'round'            : ('round' in props || isRound),
      'active'           : ('active' in props || isActive),
      'focus'            : ('focus' in props || isFocus),
      'disabled'         : ('disabled' in props || isDisabled),
      ['theme-' + theme] : theme,
      ['size-' + size]   : size,
      [className]        : className,
    });

    return (
      <button type={type} className={classes} {...others}>{children}</button>
    );
  }
}

Button.propTypes = {
  type  : PropTypes.string,
  theme : PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'danger']),
  size  : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
};

Button.defaultProps = {
  type  : 'button',
  theme : 'default',
};

export default Button;