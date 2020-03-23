import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Badge from '../badge';
import { BaseTabBarItemProps } from './PropsType';

export interface TabBarItemProps extends BaseTabBarItemProps {
  prefixCls?: string;
}

class TabBarItem extends PureComponent<TabBarItemProps, {}> {
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
    const { prefixCls, title, icon, badge, style, itemKey, selected, activeIcon = icon } = this.props;

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
      <div className={cls} style={style} onClick={() => { this.change(itemKey); }}>
        {
          badge
            ? <Badge {...badge}>{contentRender}</Badge>
            : contentRender
        }
      </div>
    );
  }
}

export default TabBarItem;
