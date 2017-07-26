import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelMore extends PureComponent {
  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    return <div {...others} className={cls}>{children}</div>;
  }
}

PanelMore.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

PanelMore.defaultProps = {
  prefixCls: 'ui-panel-more',
  className: null,
};

export default PanelMore;
