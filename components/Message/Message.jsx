import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || true,
    };
  }

  render() {
    const { prefixCls, className, theme, size, icon, hasArrow, hasClosable, onClick, children } = this.props;

    const classes = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
    });

    const iconRender = icon
      ? <div className={`${prefixCls}-icon`}>{icon}</div>
      : null;

    const renderCloseIcon = hasClosable
      ? <Icon type="wrong" onClick={() => { this.setState({ visible: false }); }} />
      : null;

    const renderArrow = hasArrow
      ? <Icon type="arrow-right" />
      : null;

    const noFooter = !hasClosable && !hasArrow;

    return this.state.visible ? (
      <div className={classes} onClick={renderArrow && onClick}>
        <div className={`${prefixCls}-header`}>{iconRender}</div>
        <div className={`${prefixCls}-body`}>{children}</div>
        {
          !noFooter
            ? <div className={`${prefixCls}-footer`}>{renderArrow}{renderCloseIcon}</div>
            : null
        }
      </div>
    ) : null;
  }
}

Message.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['lg']),
  visible: PropTypes.bool,
  icon: PropTypes.element,
  hasArrow: PropTypes.bool,
  hasClosable: PropTypes.bool,
  onClick: PropTypes.func,
};

Message.defaultProps = {
  prefixCls: 'za-message',
  className: null,
  theme: 'primary',
  size: null,
  visible: true,
  icon: null,
  hasArrow: false,
  hasClosable: false,
  onClick() {},
};

export default Message;
