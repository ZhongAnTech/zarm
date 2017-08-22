import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Icon extends PureComponent {
  render() {
    const { prefixCls, type, theme, className } = this.props;
    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`${prefixCls}-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
    });

    return (
      <i className={cls} />
    );
  }
}

Icon.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
};

Icon.defaultProps = {
  prefixCls: 'za-icon',
  className: null,
  type: '',
  theme: null,
};

export default Icon;
