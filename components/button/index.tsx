import React, { PureComponent, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import ActivityIndicator from '../activity-indicator';

export interface BaseButtonPropsType extends PropsType {
  prefixCls?: string;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonPropsType & AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & BaseButtonPropsType & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default class Button extends PureComponent<ButtonProps, {}> {
  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    size: 'md',
    shape: 'radius',
    block: false,
    ghost: false,
    disabled: false,
    loading: false,
  };

  onClick = (e) => {
    const { disabled, onClick } = this.props;
    if (disabled) {
      return;
    }
    if (typeof onClick === 'function') {
      (onClick as MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
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
      ...rest
    } = this.props;

    let classes = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--block`]: !!block,
      [`${prefixCls}--ghost`]: !!ghost,
      [`${prefixCls}--disabled`]: !!disabled,
    });

    const iconRender = loading
      ? <ActivityIndicator className="rotate360" />
      : icon;

    const childrenRender = children && <span>{children}</span>;

    const contentRender = (!!icon || loading)
      ? (
        <div className={`${prefixCls}__content`}>
          {iconRender}
          {childrenRender}
        </div>
      )
      : childrenRender;

    const { tabIndex, ...anchorRest } = rest as AnchorButtonProps;
    const { htmlType = 'button', ...nativeRest } = rest as NativeButtonProps;

    if (anchorRest.href !== undefined) {
      classes = classnames(classes, `${prefixCls}--link`);

      return (
        <a
          role="button"
          tabIndex={tabIndex}
          aria-disabled={disabled}
          className={classes}
          onClick={this.onClick}
          onTouchStart={() => {}}
          {...anchorRest}
        >
          {contentRender}
        </a>
      );
    }

    return (
      // eslint-disable-next-line
      <button
        role="button"
        aria-disabled={disabled}
        type={htmlType}
        className={classes}
        onClick={this.onClick}
        onTouchStart={() => {}}
        {...nativeRest}
      >
        {contentRender}
      </button>
    );
  }
}
