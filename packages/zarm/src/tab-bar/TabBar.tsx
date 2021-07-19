import React, { cloneElement, useCallback, useState } from 'react';
import classnames from 'classnames';
import type { BaseTabBarProps } from './interface';
import TabBarItem from './TabBarItem';
import type { TabBarItemProps } from './TabBarItem';
import { ConfigContext } from '../n-config-provider';

export interface TabBarProps
  extends BaseTabBarProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabBarProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof TabBarItem;
}

const TabBar = React.forwardRef<unknown, TabBarProps>((props, ref) => {
  const tabBarRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls: globalPrefixCls, safeIphoneX: globalSafeIphoneX } = React.useContext(
    ConfigContext,
  );
  const prefixCls = `${globalPrefixCls}-tab-bar`;

  const {
    visible,
    className,
    children,
    onChange,
    activeKey,
    defaultActiveKey,
    ...restProps
  } = props;

  const safeIphoneX = props.safeIphoneX || globalSafeIphoneX;

  const [selectedKey, setSelectedKey] = useState(defaultActiveKey);

  const onChildChange = useCallback(
    (value: string | number) => {
      if (!activeKey) {
        setSelectedKey(value);
      }
      if (typeof onChange === 'function') {
        onChange(value);
      }
    },
    [activeKey, onChange],
  );

  const getSelected = (index: number, itemKey: string | number) => {
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
      let selected = getSelected(index, itemKey);
      if (!activeKey) {
        selected = selectedKey === itemKey;
        if (!selectedKey && index === 0) {
          selected = true;
        }
      }
      return cloneElement(element, {
        key: index,
        // disabled: element.props.disabled,
        onChange: () => onChildChange(itemKey),
        badge: element.props.badge,
        title: element.props.title,
        icon: element.props.icon,
        itemKey,
        style: element.props.style,
        selected,
      });
    },
  );
  return (
    <div className={cls} ref={tabBarRef} {...restProps}>
      {items}
    </div>
  );
}) as CompoundedComponent;

TabBar.displayName = 'TabBar';

TabBar.defaultProps = {
  visible: true,
};

export default TabBar;
