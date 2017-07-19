import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Message extends PureComponent {

  render() {
    const { prefixCls, className, theme, block, children } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      block,
    });

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

Message.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  block: PropTypes.bool,
};

Message.defaultProps = {
  prefixCls: 'ui-message',
  className: null,
  theme: 'default',
  block: false,
};

export default Message;
