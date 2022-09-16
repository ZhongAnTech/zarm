import React, { cloneElement, useCallback, useState } from 'react';
import { createBEM } from '@zarm-design/bem';
import type { BaseTabBarProps } from './interface';
import TabBarItem from './TabBarItem';
import type { TabBarItemProps } from './TabBarItem';
import { ConfigContext } from '../n-config-provider';
import type { HTMLProps } from '../utils/utilityTypes';

export interface TabBarCssVars {
  '--height'?: React.CSSProperties['height'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--background'?: React.CSSProperties['background'];
  '--color'?: React.CSSProperties['color'];
  '--z-index'?: React.CSSProperties['zIndex'];
  '--active-color'?: React.CSSProperties['color'];
}

export type TabBarProps = BaseTabBarProps & React.PropsWithChildren<HTMLProps<TabBarCssVars>>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabBarProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof TabBarItem;
}

const TabBar = React.forwardRef<unknown, TabBarProps>((props, ref) => {
  const tabBarRef = (ref as any) || React.createRef<HTMLDivElement>();

  const { prefixCls, safeIphoneX: globalSafeIphoneX } = React.useContext(ConfigContext);

  const bem = createBEM('tab-bar', { prefixCls });

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

  const cls = bem([
    {
      hidden: !visible,
      safe: safeIphoneX,
    },
    className,
  ]);

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
