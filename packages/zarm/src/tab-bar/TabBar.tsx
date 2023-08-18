import { createBEM } from '@zarm-design/bem';
import React, { cloneElement, useCallback, useState } from 'react';
import { ConfigContext } from '../config-provider';
import SafeArea from '../safe-area';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseTabBarProps } from './interface';
import type { TabBarItemProps } from './TabBarItem';
import TabBarItem from './TabBarItem';

export interface TabBarCssVars {
  '--height'?: React.CSSProperties['height'];
  '--font-size'?: React.CSSProperties['fontSize'];
  '--background'?: React.CSSProperties['background'];
  '--color'?: React.CSSProperties['color'];
  '--active-color'?: React.CSSProperties['color'];
}

export type TabBarProps = BaseTabBarProps & React.PropsWithChildren<HTMLProps<TabBarCssVars>>;

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<TabBarProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof TabBarItem;
}

const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>((props, ref) => {
  const { prefixCls } = React.useContext(ConfigContext);

  const bem = createBEM('tab-bar', { prefixCls });

  const { className, children, onChange, activeKey, defaultActiveKey, safeArea, ...rest } = props;

  const [selectedKey, setSelectedKey] = useState(defaultActiveKey);

  const onChildChange = useCallback(
    (value: string | number) => {
      if (!activeKey) {
        setSelectedKey(value);
      }
      onChange?.(value);
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
        onClick: () => onChildChange(itemKey),
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
    <div {...rest} ref={ref} className={bem([className])}>
      <div className={bem('wrapper')}>{items}</div>
      {safeArea && <SafeArea position="bottom" />}
    </div>
  );
}) as CompoundedComponent;

TabBar.displayName = 'TabBar';

export default TabBar;
