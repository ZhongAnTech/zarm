import { createBEM } from '@zarm-design/bem';
import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import Loading from '../loading';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseButtonProps, ButtonShape, ButtonSize, ButtonTheme } from './interface';

export type { ButtonTheme, ButtonSize, ButtonShape };

export interface ButtonCssVars {
  '--height'?: React.CSSProperties['height'];
  '--background'?: React.CSSProperties['background'];
  '--border-radius'?: React.CSSProperties['borderRadius'];
  '--border-color'?: React.CSSProperties['borderColor'];
  '--border-width'?: React.CSSProperties['borderWidth'];
  '--padding-horizontal'?: React.CSSProperties['paddingLeft'];
  '--text-color'?: React.CSSProperties['color'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--icon-size'?: React.CSSProperties['fontSize'];
  '--active-background'?: React.CSSProperties['background'];
  '--active-border-color'?: React.CSSProperties['borderColor'];
  '--active-text-color'?: React.CSSProperties['color'];
  '--shadow'?: React.CSSProperties['boxShadow'];
  '--loading-color'?: React.CSSProperties['color'];
}

export type AnchorButtonProps = {
  mimeType?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  HTMLProps<ButtonCssVars> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  HTMLProps<ButtonCssVars> &
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
  const iconRender = loading ? <Loading /> : icon;
  const childrenRender = children && <span>{children}</span>;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('button', { prefixCls });

  const cls = bem([
    {
      [`${theme}`]: !!theme,
      [`${size}`]: !!size,
      [`${shape}`]: !!shape,
      block,
      ghost,
      shadow,
      disabled,
      loading,
      link: (restProps as AnchorButtonProps).href !== undefined,
    },
    className,
  ]);

  const contentRender =
    !!icon || loading ? (
      <div className={bem('content')}>
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
