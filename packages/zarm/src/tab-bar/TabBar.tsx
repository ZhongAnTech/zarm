import React, { cloneElement, useCallback } from 'react';
import classnames from 'classnames';
import type { BaseTabBarProps } from './interface';
import TabBarItem from './TabBarItem';
import type { TabBarItemProps } from './TabBarItem';
import { ConfigContext } from '../n-config-provider';

export interface TabBarProps
  extends BaseTabBarProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabBarProps & React.RefAttributes<HTMLElement>> {
  Item: typeof TabBarItem;
}

const TabBar = React.forwardRef<unknown, TabBarProps>((props, ref) => {
  const tabBarRef = (ref as any) || React.createRef<HTMLElement>();

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-tab-bar`;

  const { visible, className, children, style, safeIphoneX, onChange } = props;

  const onChildChange = useCallback(
    (value: string | number) => {
      if (typeof onChange === 'function') {
        onChange(value);
      }
    },
    [onChange],
  );

  const getSelected = (index: number, itemKey: string | number) => {
    const { activeKey, defaultActiveKey } = props;
    if (!activeKey) {
      if (!defaultActiveKey && index === 0) {
        return true;
      }
      return defaultActiveKey === itemKey;
    }
    return activeKey === itemKey;
  };

  const cls = classnames(prefixCls, className, {
    [`${prefixCls}--hidden`]: !visible,
    [`${prefixCls}--safe`]: safeIphoneX,
  });

  const items = React.Children.map(
    children,
    (element: React.ReactElement<TabBarItemProps, typeof TabBarItem>, index: number) => {
      if (!React.isValidElement(element)) return null;
      const itemKey = element.props.itemKey || index;
      return cloneElement(element, {
        key: index,
        // disabled: element.props.disabled,
        onChange: () => onChildChange(itemKey),
        badge: element.props.badge,
        title: element.props.title,
        icon: element.props.icon,
        itemKey,
        style: element.props.style,
        selected: getSelected(index, itemKey),
      });
    },
  );
  return (
    <div className={cls} style={style} ref={tabBarRef}>
      {items}
    </div>
  );
}) as CompoundedComponent;

TabBar.displayName = 'TabBar';

TabBar.defaultProps = {
  visible: true,
  safeIphoneX: false,
};

export default TabBar;
