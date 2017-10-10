import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Panel extends PureComponent {

  render() {
    const { prefixCls, className, children } = this.props;
    const cls = classnames(`${prefixCls}`, className);

    return <div className={cls}>{children}</div>;
  }
}

Panel.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

Panel.defaultProps = {
  prefixCls: 'za-panel',
};

export default Panel;
