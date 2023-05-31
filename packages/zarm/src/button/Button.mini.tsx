import { ButtonProps as TaroButtonProps, View } from '@tarojs/components';
import { createBEM } from '@zarm-design/bem';
import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import BaseButton from './BaseButton.mini';
import { BaseButtonProps } from './interface';

export interface ButtonProps extends BaseButtonProps, Omit<TaroButtonProps, 'size'> {}

const Button: React.FC = (props: ButtonProps) => {
  const {
    className,
    theme,
    size,
    shape,
    icon,
    block,
    shadow,
    disabled,
    loading,
    plain,
    ghost,
    children,
    ...restProps
  } = props;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('button', { prefixCls });
  const cls = bem([
    {
      [`${theme}`]: !!theme,
      [`${size}`]: !!size,
      [`${shape}`]: !!shape,
      block,
      ghost: plain || ghost,
      shadow,
      disabled,
      loading,
    },
    className,
  ]);

  const iconRender = icon;
  const textCls = loading || !!icon ? bem('text') : null;
  const childrenRender = children && <span className={textCls}>{children}</span>;

  return (
    <View className={cls}>
      <BaseButton {...restProps} />
      <View className={bem('content')}>
        {loading ? <View className={bem('loading')} /> : null}
        {icon && iconRender}
        {childrenRender}
      </View>
    </View>
  );
};

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
