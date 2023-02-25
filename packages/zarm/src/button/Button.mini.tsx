
import React, { useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ButtonProps as TaroButtonProps, View, Text } from '@tarojs/components';
import { ConfigContext } from '../config-provider';
import { BaseButtonProps } from './interface';
import BaseButton from './BaseButton.mini';

export interface ButtonProps extends BaseButtonProps, Omit<TaroButtonProps, 'size'> {};

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

  // const { prefixCls } = useContext(ConfigContext);
  // todo loading
  const bem = createBEM('button', { prefixCls : 'za' });
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
  const childrenRender = children && <Text>{children}</Text>;

  return (
    <View className={cls}>
      <BaseButton {...restProps} />
      <View className={bem('content')}>
        {icon && iconRender}
        {childrenRender}
      </View>
    </View>
  );
}

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