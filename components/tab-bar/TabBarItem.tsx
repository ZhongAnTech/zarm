import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Badge from '../badge';
import { BaseTabBarItemProps } from './PropsType';

export interface TabBarItemProps extends BaseTabBarItemProps {
  prefixCls?: String;
}

class TabBarItem extends PureComponent<TabBarItemProps, any> {
  static defaultProps: TabBarItemProps = {
    prefixCls: 'za-tab-bar',
  };

  change = (value) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  render() {
    const { prefixCls, title, icon, badge, style, itemKey, selected, activeIcon } = this.props;
    const cls = classnames(`${prefixCls}__item`, {
      [`${prefixCls}--active`]: selected,
    });
    if (badge) {
      return (
        <div className={cls} style={style} onClick={() => { this.change(itemKey); }}>
          <Badge {...badge}>
            <div className={`${prefixCls}__icon`}>{selected ? icon : activeIcon}</div>
            <div className={`${prefixCls}__title`}>{title}</div>
          </Badge>
        </div>
      );
    }
    return (
      <div className={cls} style={style} onClick={() => { this.change(itemKey); }}>
        <div className={`${prefixCls}__icon`}>{selected ? icon : activeIcon}</div>
        <div className={`${prefixCls}__title`}>{title}</div>
      </div>
    );
  }
}

export default TabBarItem;
