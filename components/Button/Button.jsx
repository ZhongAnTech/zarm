import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Spinner from '../Spinner';

class Button extends PureComponent {
  render() {
    const { prefixCls, className, theme, size, shape, icon, block, active, focus, bordered, disabled, loading, tabIndex, onClick, children, ...others } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      block,
      bordered,
      active,
      focus,
      disabled,
    });

    const iconRender = loading
      ? <Spinner className="rotate360" />
      : icon;

    const contentRender = (!!icon || loading)
      ? <div className={`${prefixCls}-content`}>{iconRender}<span>{children}</span></div>
      : children;

    return (
      <a
        {...others}
        role="button"
        tabIndex={tabIndex}
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
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  shape: PropTypes.oneOf(['radius', 'round', 'circle']),
  block: PropTypes.bool,
  bordered: PropTypes.bool,
  active: PropTypes.bool,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  prefixCls: 'za-button',
  className: null,
  theme: 'default',
  size: null,
  shape: null,
  block: false,
  bordered: false,
  active: false,
  focus: false,
  disabled: false,
  loading: false,
  tabIndex: null,
  onClick() {},
};

export default Button;
