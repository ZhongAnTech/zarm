import classnames from 'classnames';
import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import type { BaseNavBarProps } from './interface';

export interface NavBarProps
  extends BaseNavBarProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  prefixCls?: string;
}

const NavBar = forwardRef<HTMLDivElement, NavBarProps>((props, ref) => {
  const { prefixCls, className, title, left, right, ...restProps } = props;

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

NavBar.defaultProps = {
  prefixCls: 'za-nav-bar',
};

export default NavBar;
