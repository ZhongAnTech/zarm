import React from 'react';
import { createBEM } from '@zarm-design/bem';

import Badge from '../badge';
import type { BaseTabBarItemProps } from './interface';
import { ConfigContext } from '../n-config-provider';

export interface TabBarItemProps
  extends BaseTabBarItemProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {}

const TabBarItem = React.forwardRef<unknown, TabBarItemProps>((props, ref) => {
  const tabBaItemrRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tab-bar', { prefixCls });

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

  const cls = bem('item', [
    {
      active: selected,
    },
  ]);

  const contentRender = (
    <>
      <div className={bem('icon')}>{selected ? activeIcon : icon}</div>
      <div className={bem('title')}>{title}</div>
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
