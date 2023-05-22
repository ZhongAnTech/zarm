import React,  { useContext } from 'react';
import { createBEM } from '@zarm-design/bem';
import { Button, ButtonProps } from "@tarojs/components";
import { ConfigContext } from '../config-provider';

const BaseButton: React.FC = (props: ButtonProps) => {
  const { children, ...reset } = props;

  const { prefixCls } = useContext(ConfigContext);
  const bem = createBEM('button', { prefixCls });

  return <Button {...reset} className={bem([{ base: true }])}>{children}</Button>;
}

export default BaseButton;