import React, {
  PureComponent,
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import BasePropsType from './PropsType';
import ActivityIndicator from '../activity-indicator';
import { isPromise } from '../utils/validate';
import type { ModifyReturnType } from '../utils/utilityTypes';

interface BaseButtonPropsType extends BasePropsType {
  prefixCls?: string;
  onClick?: ModifyReturnType<MouseEventHandler<HTMLElement>, any>;
}

export type AnchorButtonProps = {
  mimeType?: string;
} & BaseButtonPropsType &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: 'button' | 'submit' | 'reset';
} & BaseButtonPropsType &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

export default class Button extends PureComponent<ButtonProps, { _loading: boolean }> {
  static displayName = 'Button';

  static defaultProps: ButtonProps = {
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

  constructor(props) {
    super(props);
    this.state = { _loading: false };
  }

  onClick: ButtonProps['onClick'] = (e) => {
    const { disabled, onClick, loading } = this.props;
    if (disabled || loading || this.state._loading) {
      return;
    }
    if (typeof onClick === 'function') {
      const returnValue = onClick(e);
      if (isPromise(returnValue)) {
        this.setState({ _loading: true });
        (returnValue as Promise<unknown>).finally(() => {
          this.setState({ _loading: false });
        });
      }
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
      onClick,
      loading,
      children,
      ...rest
    } = this.props;
    const { _loading } = this.state;
    const computedLoading = loading || _loading;

    let cls = classnames(prefixCls, className, {
      [`${prefixCls}--${theme}`]: !!theme,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--block`]: !!block,
      [`${prefixCls}--ghost`]: !!ghost,
      [`${prefixCls}--shadow`]: !!shadow,
      [`${prefixCls}--disabled`]: !!disabled,
      [`${prefixCls}--loading`]: computedLoading,
    });

    const iconRender = computedLoading ? <ActivityIndicator /> : icon;

    const childrenRender = children && <span>{children}</span>;

    const contentRender =
      !!icon || computedLoading ? (
        <div className={`${prefixCls}__content`}>
          {iconRender}
          {childrenRender}
        </div>
      ) : (
        childrenRender
      );

    if ((rest as AnchorButtonProps).href !== undefined) {
      const { htmlType, ...filteredRest } = rest;
      const { mimeType, ...anchorRest } = filteredRest as AnchorButtonProps;
      cls = classnames(cls, `${prefixCls}--link`);

      return (
        <a
          {...anchorRest}
          type={mimeType}
          aria-disabled={disabled}
          className={cls}
          onClick={this.onClick}
        >
          <Button onClick={() => new Promise((resolve) => setTimeout(resolve, 1000 * 3))}>
            Automatic Loading
          </Button>
          {contentRender}
        </a>
      );
    }

    const { mimeType, target, ...filteredRest } = rest;
    const { htmlType, ...nativeRest } = filteredRest as NativeButtonProps;

    return (
      <button
        {...nativeRest}
        type={htmlType}
        aria-disabled={disabled}
        className={cls}
        onClick={this.onClick}
      >
        {contentRender}
      </button>
    );
  }
}
