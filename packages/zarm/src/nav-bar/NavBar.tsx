import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../config-provider';
import type { BaseNavBarProps } from './interface';
import type { HTMLProps } from '../utils/utilityTypes';

export interface NavBarCssVars {
  '--background'?: React.CSSProperties['background'];
  '--height'?: React.CSSProperties['height'];
  '--title-color'?: React.CSSProperties['color'];
  '--title-font-size'?: React.CSSProperties['fontSize'];
  '--title-font-weight'?: React.CSSProperties['fontWeight'];
  '--side-font-size'?: React.CSSProperties['fontSize'];
  '--padding-horizontal'?: React.CSSProperties['paddingLeft'];
}

export type NavBarProps = BaseNavBarProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  HTMLProps<NavBarCssVars>;

const NavBar = forwardRef<HTMLDivElement, NavBarProps>((props, ref) => {
  const { className, title, left, right, ...restProps } = props;

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('nav-bar', { prefixCls });

  return (
    <div ref={ref} className={bem([className])} {...restProps}>
      {left && <div className={bem('side', [{ left: true }])}>{left}</div>}
      {title && <div className={bem('title')}>{title}</div>}
      {right && <div className={bem('side', [{ right: true }])}>{right}</div>}
    </div>
  );
});

NavBar.displayName = 'NavBar';
NavBar.defaultProps = {};

export default NavBar;
