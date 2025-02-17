import { createBEM } from '@zarm-design/bem';
import React from 'react';
import Badge from '../badge';
import { ConfigContext } from '../config-provider';
import type { BaseTabBarItemProps } from './interface';

export interface TabBarItemProps
  extends BaseTabBarItemProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {}

const TabBarItem = React.forwardRef<HTMLDivElement, TabBarItemProps>((props, ref) => {
  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('tab-bar', { prefixCls });

  const { title, icon, badge, selected, activeIcon = icon, onClick, itemKey, ...restProps } = props;

  const contentRender = (activeIcon || icon) && (
    <div className={bem('icon')}>{selected ? activeIcon : icon}</div>
  );

  return (
    <div
      className={bem('item', [
        {
          active: selected,
        },
      ])}
      ref={ref}
      onClick={onClick}
      {...restProps}
    >
      {badge ? <Badge {...badge}>{contentRender}</Badge> : contentRender}
      <div className={bem('title')}>{title}</div>
    </div>
  );
});

TabBarItem.displayName = 'TabBarItem';

export default TabBarItem;
