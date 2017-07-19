import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Icon extends PureComponent {

  render() {
    const { prefixCls, type, theme, className, ...others } = this.props;
    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`${prefixCls}-${type}`]: !!type,
      [`theme-${theme}`]: !!theme,
    });

    return (
      <i className={cls} {...others} />
    );
  }

}

Icon.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
};

Icon.defaultProps = {
  prefixCls: 'ui-icon',
  className: null,
  type: '',
  theme: null,
};

export default Icon;
