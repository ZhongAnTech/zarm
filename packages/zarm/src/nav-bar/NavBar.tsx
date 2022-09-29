import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { createBEM } from '@zarm-design/bem';
import { ConfigContext } from '../n-config-provider';
import type { BaseNavBarProps } from './interface';

export type NavBarProps = BaseNavBarProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const NavBar = forwardRef<HTMLDivElement, NavBarProps>((props, ref) => {
  const { className, title, left, right, ...restProps } = props;

  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('nav-bar', { prefixCls });

  return (
    <div ref={ref} className={bem([className])} {...restProps}>
      <div className={bem('side', [{ left: true }])}>{left}</div>
      <div className={bem('title')}>{title}</div>
      <div className={bem('side', [{ right: true }])}>{right}</div>
    </div>
  );
});

NavBar.displayName = 'NavBar';

NavBar.defaultProps = {};

export default NavBar;
