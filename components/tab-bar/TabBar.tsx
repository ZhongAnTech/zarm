import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import { BaseTabBarProps } from './PropsType';
import TabBarItem from './TabBarItem';

export interface TabBarProps extends BaseTabBarProps {
  prefixCls?: string;
  className?: string;
}

class TabBar extends PureComponent<TabBarProps, any> {
  static Item: typeof TabBarItem;

  static defaultProps: TabBarProps = {
    prefixCls: 'za-tab-bar',
    visible: true,
  };

  onChildChange = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  getSelected = (index, itemKey) => {
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
    const { visible, prefixCls, children, style } = this.props;
    const cls = classnames(prefixCls, {
      [`${prefixCls}--hidden`]: !visible,
    });
    const items = React.Children.map(children, (element: JSX.Element, index) => {
      return cloneElement(element, {
        key: index,
        disabled: element.props.disabled,
        onChange: () => this.onChildChange(element.props.itemKey),
        badge: element.props.badge,
        title: element.props.title,
        icon: element.props.icon,
        itemKey: element.props.itemKey || index,
        style: element.props.style,
        selected: this.getSelected(index, element.props.itemKey),
      });
    });
    return <div className={cls} style={style}>{items}</div>;
  }
}

export default TabBar;
