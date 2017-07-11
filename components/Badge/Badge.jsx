import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Badge extends PureComponent {

  render() {
    const { prefixCls, className, theme, shape, sup, isSup, text, children, ...others } = this.props;
    const supFlag = ('sup' in this.props || isSup);

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
    });

    const supCls = classnames({
      [`${prefixCls}-sup`]: true,
      [`${prefixCls}-sup-up`]: supFlag,
    });

    return (
      <span className={cls}>
        {children}
        <sup className={supCls} {...others}>{text}</sup>
      </span>
    );
  }

}

Badge.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  shape: PropTypes.oneOf(['dot', 'radius', 'round', 'circle']),
  isSup: PropTypes.bool,
};

Badge.defaultProps = {
  prefixCls: 'ui-badge',
  className: null,
  theme: null,
  shape: null,
  isSup: false,
};

export default Badge;
