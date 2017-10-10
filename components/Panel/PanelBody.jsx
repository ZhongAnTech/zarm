import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelBody extends PureComponent {

  render() {
    const { prefixCls, className, children, ...others } = this.props;
    const cls = classnames(`${prefixCls}-body`, className);

    return <div {...others} className={cls}>{children}</div>;
  }
}

PanelBody.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

PanelBody.defaultProps = {
  prefixCls: 'za-panel',
};

export default PanelBody;
