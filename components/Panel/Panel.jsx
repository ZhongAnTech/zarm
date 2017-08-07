import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Panel extends PureComponent {
  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return <div {...others} className={cls}>{children}</div>;
  }
}

Panel.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

Panel.defaultProps = {
  prefixCls: 'za-panel',
  className: null,
};

export default Panel;
