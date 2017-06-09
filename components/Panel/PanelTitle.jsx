import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelTitle extends PureComponent {

  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return <div {...others} className={cls}>{children}</div>;
  }

}

PanelTitle.propTypes = {
  prefixCls: PropTypes.string,
};

PanelTitle.defaultProps = {
  prefixCls: 'ui-panel-title',
};

export default PanelTitle;
