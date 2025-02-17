import type { IconProps as BaseIconProps } from '@zarm-design/icons';
import { Icon as BaseIcon } from '@zarm-design/icons';
import * as React from 'react';
import type { HTMLProps } from '../utils/utilityTypes';

export interface IconCssVars {
  '--font-size'?: React.CSSProperties['fontSize'];
  '--color'?: React.CSSProperties['color'];
}

export type IconProps = Omit<BaseIconProps, 'prefixCls'> & HTMLProps<IconCssVars>;

interface CompoundedComponent extends React.ForwardRefExoticComponent<IconProps> {
  createFromIconfont: typeof BaseIcon.createFromIconfont;
}

const Icon = React.forwardRef<HTMLElement, IconProps>((props, ref) => {
  return <BaseIcon ref={ref} {...props} />;
}) as CompoundedComponent;

Icon.createFromIconfont = BaseIcon.createFromIconfont;

Icon.displayName = 'Icon';
Icon.defaultProps = {
  viewBox: '0 0 1000 1000',
};

export default Icon;
