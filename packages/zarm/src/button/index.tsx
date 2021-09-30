import * as React from 'react';
import classnames from 'classnames';
import ActivityIndicator from '../activity-indicator';
import { ConfigContext } from '../n-config-provider';
import type { BaseButtonProps, ButtonTheme, ButtonSize, ButtonShape } from './interface';

export type { ButtonTheme, ButtonSize, ButtonShape };

interface CommonProps extends BaseButtonProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type AnchorButtonProps = {
  mimeType?: string;
} & CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: 'button' | 'submit' | 'reset';
} & CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

const Button = React.forwardRef<unknown, ButtonProps>((props, ref) => {
  const {
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
    htmlType,
    onClick,
    children,
    ...restProps
  } = props;

  const buttonRef = (ref as any) || React.createRef<HTMLButtonElement | HTMLAnchorElement>();
  const iconRender = loading ? <ActivityIndicator /> : icon;
  const childrenRender = children && <span>{children}</span>;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-button`;

  let cls = classnames(prefixCls, className, {
    [`${prefixCls}--${theme}`]: !!theme,
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--${shape}`]: !!shape,
    [`${prefixCls}--block`]: block,
    [`${prefixCls}--ghost`]: ghost,
    [`${prefixCls}--shadow`]: shadow,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--loading`]: loading,
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
        {...(anchorRest as AnchorButtonProps)}
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
      {...(nativeRest as NativeButtonProps)}
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

Button.defaultProps = {
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

export default Button;
