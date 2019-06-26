import React, { PureComponent, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BasePropsType from './PropsType';
import ActivityIndicator from '../activity-indicator';

export interface BaseButtonPropsType extends BasePropsType {
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
  static displayName = 'Button';

  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    size: 'md',
    shape: 'radius',
    block: false,
    ghost: false,
    disabled: false,
    loading: false,
    icon: undefined,
    children: undefined,
    href: undefined,
    target: undefined,
    htmlType: 'button',
    onClick: undefined,
  };

  static propTypes = {
    /** 类名前缀 */
    prefixCls: PropTypes.string,

    /** 设置主题 */
    theme: PropTypes.oneOf(['default', 'primary', 'danger']),

    /** 设置大小 */
    size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),

    /** 设置形状 */
    shape: PropTypes.oneOf(['radius', 'rect', 'round', 'circle']),

    /** 是否块级元素 */
    block: PropTypes.bool,

    /** 是否幽灵按钮 */
    ghost: PropTypes.bool,

    /** 是否禁用 */
    disabled: PropTypes.bool,

    /** 是否加载中 */
    loading: PropTypes.bool,

    /** 图标 */
    icon: PropTypes.node,

    /** 内容 */
    children: PropTypes.node,

    /** 链接地址 */
    href: PropTypes.string,

    /** 跳转方式 */
    target: PropTypes.string,

    /** 按钮类型 */
    htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),

    /** 点击事件 */
    onClick: PropTypes.func,
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
