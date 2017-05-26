import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelFooter extends Component {

  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}-footer`]: true,
      [className]: !!className,
    });

    return <div {...others} className={cls}>{children}</div>;
  }

}

PanelFooter.propTypes = {
  prefixCls: PropTypes.string,
};

PanelFooter.defaultProps = {
  prefixCls: 'ui-panel',
};

export default PanelFooter;
