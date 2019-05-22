import React, { PureComponent, MouseEventHandler } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Icon from '../icon';

export interface MessageProps extends PropsType {
  prefixCls?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export interface MessageState {
  visible?: boolean;
}

export default class Message extends PureComponent<MessageProps, MessageState> {
  static defaultProps = {
    prefixCls: 'za-message',
    theme: 'primary',
    hasArrow: false,
    closable: false,
  };

  constructor(props: MessageProps) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const { hasArrow, onClick } = this.props;
    if (hasArrow && typeof onClick === 'function') {
      onClick(e);
    }
  };

  onClose: MouseEventHandler<HTMLDivElement> = () => {
    this.setState({ visible: false });
  };

  render() {
    const { prefixCls, className, theme, size, icon, hasArrow, closable, children } = this.props;
    const { visible } = this.state;

    const classes = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: !!size,
    });

    const iconRender = icon && <div className={`${prefixCls}__icon`}>{icon}</div>;
    const renderCloseIcon = closable && <Icon type="wrong" onClick={this.onClose} />;
    const renderArrow = hasArrow && <Icon type="arrow-right" />;
    const noFooter = !closable && !hasArrow;

    return visible && (
      <div className={classes} onClick={this.onClick}>
        <div className={`${prefixCls}__header`}>{iconRender}</div>
        <div className={`${prefixCls}__body`}>{children}</div>
        {
          !noFooter && (
            <div className={`${prefixCls}__footer`}>
              {renderArrow}
              {renderCloseIcon}
            </div>
          )
        }
      </div>
    );
  }
}
