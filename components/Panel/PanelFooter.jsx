import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelFooter extends PureComponent {

  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return <div {...others} className={cls}>{children}</div>;
  }

}

PanelFooter.propTypes = {
  prefixCls: PropTypes.string,
};

PanelFooter.defaultProps = {
  prefixCls: 'ui-panel-footer',
};

export default PanelFooter;
