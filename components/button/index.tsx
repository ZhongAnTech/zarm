import React, { PureComponent, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import BasePropsType from './PropsType';
import ActivityIndicator from '../activity-indicator';

export interface BaseButtonPropsType extends BasePropsType {
  prefixCls?: string;
  htmlType: 'button' | 'submit' | 'reset';
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonPropsType & AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & BaseButtonPropsType & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default class Button extends PureComponent<ButtonProps, {}> {
  static displayName = 'Button';

  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    size: 'md',
    shape: 'radius',
    block: false,
    ghost: false,
    shadow: false,
    disabled: false,
    loading: false,
    htmlType: 'button',
  };

  onClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = (e) => {
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
      shadow,
      disabled,
      loading,
      onClick,
      children,
      ...rest
    } = this.props;

    let cls = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--block`]: !!block,
      [`${prefixCls}--ghost`]: !!ghost,
      [`${prefixCls}--shadow`]: !!shadow,
      [`${prefixCls}--disabled`]: !!disabled,
    });

    const iconRender = loading
      ? <ActivityIndicator />
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

    const { htmlType: excludeProp, ...anchorRest } = rest as AnchorButtonProps;
    const { htmlType, ...nativeRest } = rest as NativeButtonProps;

    if (anchorRest.href !== undefined) {
      cls = classnames(cls, `${prefixCls}--link`);

      return (
        <a
          aria-disabled={disabled}
          className={cls}
          onClick={this.onClick}
          onTouchStart={() => {}}
          {...anchorRest}
        >
          {contentRender}
        </a>
      );
    }

    return (
      <button
        aria-disabled={disabled}
        type={htmlType}
        className={cls}
        onClick={this.onClick}
        onTouchStart={() => {}}
        {...nativeRest}
      >
        {contentRender}
      </button>
    );
  }
}
