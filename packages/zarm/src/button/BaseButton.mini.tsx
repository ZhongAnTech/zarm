import React,  { useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
import { Button, ButtonProps } from "@tarojs/components";
import { ConfigContext } from '../config-provider';

const BaseButton: React.FC = (props: ButtonProps) => {
  const { children, ...reset } = props;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('button--base', { prefixCls });

  return <Button {...reset} className={bem()}>{children}</Button>;
}

export default BaseButton;