import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class PanelHeader extends PureComponent {

  render() {
    const { prefixCls, className, title, more } = this.props;

    const cls = classnames({
      [`${prefixCls}-header`]: true,
      [className]: !!className,
    });

    return (
      <div className={cls}>
        { title && <div className={`${prefixCls}-title`}>{title}</div> }
        { more && <div className={`${prefixCls}-more`}>{more}</div> }
      </div>
    );
  }
}

PanelHeader.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

PanelHeader.defaultProps = {
  prefixCls: 'za-panel',
};

export default PanelHeader;
