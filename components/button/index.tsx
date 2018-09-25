import React, { PureComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import ActivityIndicator from '../activity-indicator';

export interface ButtonProps extends HTMLAttributes<HTMLAnchorElement>, PropsType {
  prefixCls?: string;
  className?: string;
}

export default class Button extends PureComponent<ButtonProps, {}> {
  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    size: 'md',
    shape: 'rect',
    block: false,
    ghost: false,
    disabled: false,
    loading: false,
  };

  render() {
    const {
      prefixCls,
      className,
      theme,
      size,
      shape,
      icon,
      block,
      ghost,
      disabled,
      loading,
      onClick,
      children,
      ...others
    } = this.props;

    const classes = classnames(prefixCls, className, {
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      block,
      ghost,
      disabled,
    });

    const iconRender = loading
      ? <ActivityIndicator className="rotate360" />
      : icon;

    const childrenRender = children && <span>{children}</span>;

    const contentRender = (!!icon || loading)
      ? <div className={`${prefixCls}-content`}>{iconRender}{childrenRender}</div>
      : childrenRender;

    return (
      <a
        role="button"
        aria-disabled={disabled}
        className={classes}
        onClick={e => !disabled && typeof onClick === 'function' && onClick(e)}
        onTouchStart={() => {}}
        {...others}
      >
        {contentRender}
      </a>
    );
  }
}
