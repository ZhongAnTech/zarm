import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Button extends PureComponent {

  render() {
    const props = this.props;
    const { prefixCls, className, theme, size, shape, icon, isBlock, isActive, isFocus, isBordered, isDisabled, isLoading, onClick, children } = this.props;
    const disabled = ('disabled' in props || isDisabled);
    const loading = ('loading' in props || isLoading);

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      block: ('block' in props || isBlock),
      bordered: ('bordered' in props || isBordered),
      active: ('active' in props || isActive),
      focus: ('focus' in props || isFocus),
      disabled,
    });

    const iconRender = loading
      ? <Icon type="loading" className="rotate360" />
      : icon;

    const childrenRender = children
      ? <span>{children}</span>
      : null;

    const contentRender = (!!icon || loading)
      ? <span className={`${prefixCls}-content`}>{iconRender}{childrenRender}</span>
      : childrenRender;

    return (
      <a
        role="button"
        aria-disabled={disabled}
        className={classes}
        onTouchStart={() => {}}
        onClick={e => !disabled && onClick(e)}>
        {contentRender}
      </a>
    );
  }
}

Button.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  shape: PropTypes.oneOf(['radius', 'round', 'circle']),
  isBlock: PropTypes.bool,
  isBordered: PropTypes.bool,
  isActive: PropTypes.bool,
  isFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  prefixCls: 'ui-button',
  className: null,
  theme: null,
  size: null,
  shape: null,
  isBlock: false,
  isBordered: false,
  isActive: false,
  isFocus: false,
  isDisabled: false,
  isLoading: false,
  onClick: () => {},
};

export default Button;
