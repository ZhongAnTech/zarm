import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import type { BaseTabBarProps } from './PropsType';
import type TabBarItem from './TabBarItem';

export interface TabBarProps extends BaseTabBarProps {
  prefixCls?: string;
  className?: string;
}

class TabBar extends PureComponent<TabBarProps, any> {
  static Item: typeof TabBarItem;

  static defaultProps: TabBarProps = {
    prefixCls: 'za-tab-bar',
    visible: true,
    safeIphoneX: false,
  };

  onChildChange = (value: string | number) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  getSelected = (index: number, itemKey: string | number) => {
    const { activeKey, defaultActiveKey } = this.props;
    if (!activeKey) {
      if (!defaultActiveKey && index === 0) {
        return true;
      }
      return defaultActiveKey === itemKey;
    }
    return activeKey === itemKey;
  };

  render() {
    const { visible, prefixCls, className, children, style, safeIphoneX } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--hidden`]: !visible,
      [`${prefixCls}--safe`]: safeIphoneX,
    });

    const items = React.Children.map(children, (element, index) => {
      if (!React.isValidElement(element)) return null;
      const itemKey = element.props.itemKey || index;
      return cloneElement(element, {
        key: index,
        disabled: element.props.disabled,
        onChange: () => this.onChildChange(itemKey),
        badge: element.props.badge,
        title: element.props.title,
        icon: element.props.icon,
        itemKey,
        style: element.props.style,
        selected: this.getSelected(index, itemKey),
      });
    });
    return (
      <div className={cls} style={style}>
        {items}
      </div>
    );
  }
}

export default TabBar;
