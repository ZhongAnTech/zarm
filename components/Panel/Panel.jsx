import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Panel extends PureComponent {

  render() {
    const props = this.props;
    const { prefixCls, isRadius, theme, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      radius: ('radius' in props || isRadius),
      [`theme-${theme}`]: !!theme,
      [className]: !!className,
    });

    return <div {...others} className={cls}>{children}</div>;
  }

}

Panel.propTypes = {
  prefixCls: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  isRadius: PropTypes.bool,
};

Panel.defaultProps = {
  prefixCls: 'ui-panel',
  theme: 'default',
  isRadius: false,
};

export default Panel;
