import React from 'react';
import classnames from 'classnames';
import Badge from '../badge';
import type { BaseTabBarItemProps } from './interface';
import { ConfigContext } from '../n-config-provider';

export interface TabBarItemProps
  extends BaseTabBarItemProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {}

const TabBarItem = React.forwardRef<unknown, TabBarItemProps>((props, ref) => {
  const tabBaItemrRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-tab-bar`;

  const {
    title,
    icon,
    badge,
    selected,
    activeIcon = icon,
    onChange,
    itemKey,
    ...restProps
  } = props;

  const cls = classnames(`${prefixCls}__item`, {
    [`${prefixCls}--active`]: selected,
  });

  const contentRender = (
    <>
      <div className={`${prefixCls}__icon`}>{selected ? activeIcon : icon}</div>
      <div className={`${prefixCls}__title`}>{title}</div>
    </>
  );

  return (
    <div className={cls} ref={tabBaItemrRef} onClick={onChange} {...restProps}>
      {badge ? <Badge {...badge}>{contentRender}</Badge> : contentRender}
    </div>
  );
});

TabBarItem.displayName = 'TabBarItem';

export default TabBarItem;
