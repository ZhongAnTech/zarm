import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Message extends PureComponent {
  render() {
    const { prefixCls, className, theme, size, block, icon, mode, children } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      block,
    });

    const iconRender = icon
      ? <div className={`${prefixCls}-icon`}>{icon}</div>
      : null;

    let footerRender;
    if (mode === 'closable') {
      footerRender = <Icon type="wrong" />;
    } else if (mode === 'link') {
      footerRender = <Icon type="arrow-right" />;
    }

    return (
      <div className={classes}>
        <div className={`${prefixCls}-header`}>{iconRender}</div>
        <div className={`${prefixCls}-body`}>{children}</div>
        <div className={`${prefixCls}-footer`}>{footerRender}</div>
      </div>
    );
  }
}

Message.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['lg']),
  block: PropTypes.bool,
  mode: PropTypes.oneOf(['link', 'closable']),
  icon: PropTypes.element,
};

Message.defaultProps = {
  prefixCls: 'za-message',
  className: null,
  theme: 'primary',
  size: null,
  block: false,
  mode: null,
  icon: null,
};

export default Message;
