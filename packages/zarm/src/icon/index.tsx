import * as React from 'react';
import { Icon as BaseIcon } from '@zarm-design/icons';
import type { IconProps as BaseIconProps } from '@zarm-design/icons';
import { ConfigContext } from '../n-config-provider';

export interface IconCssVars {
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
}

export type IconProps = Omit<BaseIconProps, 'prefixCls'>;

interface CompoundedComponent extends React.ForwardRefExoticComponent<IconProps> {
  createFromIconfont: typeof BaseIcon.createFromIconfont;
}

const Icon = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  const { prefixCls } = React.useContext(ConfigContext);
  return <BaseIcon ref={ref} prefixCls={prefixCls} {...props} />;
}) as CompoundedComponent;

Icon.createFromIconfont = BaseIcon.createFromIconfont;

Icon.displayName = 'Icon';
Icon.defaultProps = {
  viewBox: '0 0 1000 1000',
};

export default Icon;
