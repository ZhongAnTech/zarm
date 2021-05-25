import * as React from 'react';
import classnames from 'classnames';
import ActivityIndicator from '../activity-indicator';
import type { BaseButtonProps as BaseType, ButtonTheme, ButtonSize, ButtonShape } from './PropsType';

export type { ButtonTheme, ButtonSize, ButtonShape };

interface BaseButtonProps extends BaseType {
  prefixCls?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type AnchorButtonProps = {
  mimeType?: string;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: 'button' | 'submit' | 'reset';
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button = React.forwardRef<unknown, ButtonProps>(({
  prefixCls = 'za-button',
  className,
  theme = 'default',
  size = 'md',
  shape = 'radius',
  icon,
  block = false,
  ghost = false,
  shadow = false,
  disabled = false,
  loading = false,
  htmlType = 'button' as ButtonProps['htmlType'],
  onClick,
  children,
  ...restProps
}: ButtonProps, ref) => {
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();
  const iconRender = loading ? <ActivityIndicator /> : icon;
  const childrenRender = children && <span>{children}</span>;

  let cls = classnames(prefixCls, className, {
    [`${prefixCls}--${theme}`]: !!theme,
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--${shape}`]: !!shape,
    [`${prefixCls}--block`]: !!block,
    [`${prefixCls}--ghost`]: !!ghost,
    [`${prefixCls}--shadow`]: !!shadow,
    [`${prefixCls}--disabled`]: !!disabled,
  });

  const contentRender =
    !!icon || loading ? (
      <div className={`${prefixCls}__content`}>
        {iconRender}
        {childrenRender}
      </div>
    ) : (
      childrenRender
    );

  const onPress: ButtonProps['onClick'] = (e) => {
    if (disabled) {
      return;
    }
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  if ((restProps as AnchorButtonProps).href !== undefined) {
    const { mimeType, ...anchorRest } = restProps;
    cls = classnames(cls, `${prefixCls}--link`);

    return (
      <a
        {...anchorRest as AnchorButtonProps}
        type={mimeType}
        aria-disabled={disabled}
        className={cls}
        onClick={onPress}
        ref={buttonRef}
      >
        {contentRender}
      </a>
    );
  }

  const { mimeType, target, ...nativeRest } = restProps;

  return (
    <button
      {...nativeRest as NativeButtonProps}
      type={htmlType}
      aria-disabled={disabled}
      className={cls}
      onClick={onPress}
      ref={buttonRef}
    >
      {contentRender}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
