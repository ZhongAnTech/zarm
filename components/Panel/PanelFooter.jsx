import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelFooter extends PureComponent {

  render() {
    const { prefixCls, className, title, more } = this.props;
    const cls = classnames(`${prefixCls}-footer`, className);

    return (
      <div className={cls}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {more && <div className={`${prefixCls}-more`}>{more}</div>}
      </div>
    );
  }
}

PanelFooter.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

PanelFooter.defaultProps = {
  prefixCls: 'za-panel',
};

export default PanelFooter;
