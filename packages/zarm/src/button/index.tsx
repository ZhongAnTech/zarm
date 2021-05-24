import React, {
  MouseEventHandler,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import classnames from 'classnames';
import BasePropsType, { ButtonTheme, ButtonSize, ButtonShape } from './PropsType';
import ActivityIndicator from '../activity-indicator';

export { ButtonTheme, ButtonSize, ButtonShape };

interface BaseButtonPropsType extends BasePropsType {
  prefixCls?: string;
  onClick?: MouseEventHandler<HTMLElement>;
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

const Button = React.forwardRef<unknown, ButtonProps>((props, ref) => {
  const {
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
    ...rest
  } = props;

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

  if ((rest as AnchorButtonProps).href !== undefined) {
    const { mimeType, ...anchorRest } = rest;
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

  const { mimeType, target, ...nativeRest } = rest;

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
