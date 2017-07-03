import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Badge extends PureComponent {

  render() {
    const props = this.props;
    const { prefixCls, className, theme, shape, isSup, text, children } = this.props;
    const sup = ('sup' in props || isSup);

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
    });

    const supCls = classnames({
      [`${prefixCls}-sup`]: true,
      [`${prefixCls}-sup-up`]: sup,
    });

    return (
      <div className={cls}>
        {children}
        <sup className={supCls}>{text}</sup>
      </div>
    );
  }

}

Badge.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  shape: PropTypes.oneOf(['dot', 'radius', 'round', 'circle']),
  isSup: PropTypes.bool,
  onClick: PropTypes.func,
};

Badge.defaultProps = {
  prefixCls: 'ui-badge',
  className: null,
  theme: null,
  shape: null,
  isSup: false,
  onClick: () => {},
};

export default Badge;
