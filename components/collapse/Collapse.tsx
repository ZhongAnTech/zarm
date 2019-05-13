import React, { PureComponent, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import { BaseCollapseProps } from './PropsType';
import { isArray } from '../utils/validate';
import { CollapseItemProps } from './CollapseItem';

export interface CollapseProps extends BaseCollapseProps {
  prefixCls?: string;
  className?: string;
}

export default class Collapse extends PureComponent<CollapseProps, any> {
  static defaultProps = {
    prefixCls: 'za-collapse',
    multiple: false,
    animated: false,
    onChange: () => {},
  };

  static Item: any;

  constructor(props) {
    super(props);
    this.state = {
      activeKey: this.getActiveKey(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeKey } = this.props;

    if (!this.isPropEqual(activeKey, nextProps.activeKey)) {
      this.setState({
        activeKey: this.getActiveKey(nextProps),
      });
    }
  }

  onItemChange = (key) => {
    if (!key) {
      return;
    }
    const { onChange, multiple } = this.props;
    const { activeKey } = this.state;
    const hasKey = activeKey.indexOf(key) > -1;
    let newActiveKey: Array<string> = [];
    if (multiple) {
      if (hasKey) {
        newActiveKey = activeKey.filter(i => i !== key);
      } else {
        newActiveKey = activeKey.slice(0);
        newActiveKey.push(key);
      }
    } else {
      newActiveKey = hasKey ? [] : [key];
    }
    this.setState({
      activeKey: newActiveKey,
    });
    onChange(key);
  };

  getActiveKey = (props) => {
    const { activeKey, defaultActiveKey, multiple } = props;

    const defaultKey = (activeKey || activeKey === 0) ? activeKey : defaultActiveKey;

    if (defaultKey || defaultKey === 0) {
      if (isArray(defaultKey)) {
        return !multiple
          ? [String(defaultKey[0])]
          : (defaultKey as Array<any>).map(key => String(key));
      }
      return [String(defaultKey)];
    }
    return [];
  };

  isPropEqual = (cur, next) => {
    if (isArray(next) && isArray(cur)) {
      return next.length === cur.length && next.every((key, i) => key === cur[i]);
    }
    return cur === next;
  };

  renderItems = () => {
    const { animated } = this.props;
    const { activeKey } = this.state;

    return Children.map(
      this.props.children,
      (ele: ReactElement<CollapseItemProps>) => {
        const { disabled, itemKey } = ele.props;
        const key = itemKey && String(itemKey);
        const isActive = activeKey.indexOf(key) > -1;
        return cloneElement(ele, {
          animated,
          isActive,
          onItemChange: disabled ? () => {} : () => this.onItemChange(key),
        });
      },
    );
  };

  render() {
    const { prefixCls, className, animated, style } = this.props;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--animated`]: animated,
    });

    return (
      <div className={cls} style={style}>
        {this.renderItems()}
      </div>
    );
  }
}
