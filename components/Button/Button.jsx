import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Button extends PureComponent {

  render() {
    const props = this.props;
    const { prefixCls, theme, size, icon, isBlock, isRadius, isRound, isCircle, isActive, isFocus, isBordered, isDisabled, isLoading, className, onClick, children } = this.props;
    const disabled = ('disabled' in props || isDisabled);
    const loading = ('loading' in props || isLoading);

    const classes = classnames({
      [`${prefixCls}`]: true,
      block: ('block' in props || isBlock),
      radius: ('radius' in props || isRadius),
      round: ('round' in props || isRound),
      circle: ('circle' in props || isCircle),
      bordered: ('bordered' in props || isBordered),
      active: ('active' in props || isActive),
      focus: ('focus' in props || isFocus),
      disabled,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className]: !!className,
    });

    const iconRender = loading
      ? <Icon type="loading" className="rotate360" />
      : icon;

    return (
      <a role="button" aria-disabled={disabled} className={classes} onTouchStart={() => {}} onClick={e => !disabled && onClick(e)}>
        {(!!icon || loading) && iconRender}
        {!!children && <span>{children}</span>}
      </a>
    );
  }
}

Button.propTypes = {
  prefixCls: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isBlock: PropTypes.bool,
  isRadius: PropTypes.bool,
  isRound: PropTypes.bool,
  isCircle: PropTypes.bool,
  isBordered: PropTypes.bool,
  isActive: PropTypes.bool,
  isFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  prefixCls: 'ui-button',
  theme: null,
  size: null,
  isBlock: false,
  isRadius: false,
  isRound: false,
  isCircle: false,
  isBordered: false,
  isActive: false,
  isFocus: false,
  isDisabled: false,
  isLoading: false,
  className: null,
  onClick: () => {},
};

export default Button;
