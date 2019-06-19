import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Badge from '../badge';

export interface TabBarItemProps {
  prefixCls?: String;
  itemKey?: string | number;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: {
    shape: 'dot' | 'radius' | 'round' | 'rect' | 'circle' | 'leaf';
    sup: boolean;
    text: string;
  };
  selected?: boolean;
  style?: React.CSSProperties;
  onChange?: (value?: number | string) => void;
}

class Item extends PureComponent<TabBarItemProps, any> {
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
    const cls = classnames({
      [`${prefixCls}__item`]: true,
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

export default Item;
