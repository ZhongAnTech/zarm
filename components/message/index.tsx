import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Icon from '../icon';

export interface MessageProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Message extends PureComponent<MessageProps, any> {
  static defaultProps = {
    prefixCls: 'za-message',
    theme: 'primary',
    hasArrow: false,
    hasClosable: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  onClick = () => {
    const { hasArrow, onClick } = this.props;
    if (hasArrow && typeof onClick === 'function') {
      onClick();
    }
  }

  render() {
    const { prefixCls, className, theme, size, icon, hasArrow, hasClosable, children } = this.props;

    const classes = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
    });

    const iconRender = icon && <div className={`${prefixCls}-icon`}>{icon}</div>;
    const renderCloseIcon = hasClosable && <Icon type="wrong" onClick={() => { this.setState({ visible: false }); }} />;
    const renderArrow = hasArrow && <Icon type="arrow-right" />;
    const noFooter = !hasClosable && !hasArrow;

    return this.state.visible && (
      <div className={classes} onClick={this.onClick}>
        <div className={`${prefixCls}-header`}>{iconRender}</div>
        <div className={`${prefixCls}-body`}>{children}</div>
        {!noFooter && <div className={`${prefixCls}-footer`}>{renderArrow}{renderCloseIcon}</div>}
      </div>
    );
  }
}
