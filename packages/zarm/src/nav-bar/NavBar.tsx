import React, { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../n-config-provider';
import type { BaseNavBarProps } from './interface';

export type NavBarProps = BaseNavBarProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const NavBar = forwardRef<HTMLDivElement, NavBarProps>((props, ref) => {
  const { className, title, left, right, ...restProps } = props;

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-nav-bar`;

  const cls = classnames(prefixCls, className);
  const titleCls = `${prefixCls}__title`;
  const sideCls = `${prefixCls}__side`;
  const leftCls = `${sideCls} ${prefixCls}__side--left`;
  const rightCls = `${sideCls} ${prefixCls}__side--right`;

  return (
    <div ref={ref} className={cls} {...restProps}>
      <div className={leftCls}>{left}</div>
      <div className={titleCls}>{title}</div>
      <div className={rightCls}>{right}</div>
    </div>
  );
});

NavBar.displayName = 'NavBar';

NavBar.defaultProps = {};

export default NavBar;
