import React, { Component, Children, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import { BaseCollapseProps } from './PropsType';
import { isArray } from '../utils/validate';
import { CollapseItemProps } from './CollapseItem';

export interface CollapseProps extends BaseCollapseProps {
  prefixCls?: string;
  className?: string;
}

const isPropEqual = (cur, next) => {
  if (isArray(next) && isArray(cur)) {
    return next.length === cur.length && next.every((key, i) => key === cur[i]);
  }
  return cur === next;
};

const getActiveKey = (props) => {
  const { activeKey, defaultActiveKey, multiple } = props;

  const defaultKey = (activeKey || activeKey === 0) ? activeKey : defaultActiveKey;

  if (defaultKey || defaultKey === 0) {
    if (isArray(defaultKey)) {
      return !multiple
        ? String(defaultKey[0])
        : (defaultKey as Array<any>).map((key) => String(key));
    }
    return String(defaultKey);
  }
  return [];
};

export default class Collapse extends Component<CollapseProps, any> {
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
      activeKey: getActiveKey(props),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    const newState: any = {};
    if ('activeKey' in nextProps && nextProps.activeKey !== state.prevActiveKey) {
      newState.activeKey = getActiveKey(nextProps);
      newState.prevActiveKey = nextProps.activeKey;
    }
    if ('animated' in nextProps) {
      newState.animated = nextProps.animated;
    }
    if ('multiple' in nextProps) {
      newState.multiple = nextProps.multiple;
    }
    return newState.activeKey || newState.animated || newState.multiple ? newState : null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isPropEqual(this.props, nextProps) || !isPropEqual(this.state, nextState);
  }

  onItemChange = (onItemChange, key) => {
    if (!key) {
      return;
    }

    const { activeKey } = this.state;
    const { onChange, multiple } = this.props;
    let isActive;
    let newActiveKey;

    if (multiple) {
      const hasKey = activeKey.indexOf(key) > -1;
      newActiveKey = [];
      if (multiple) {
        if (hasKey) {
          newActiveKey = activeKey.filter((i) => i !== key);
        } else {
          newActiveKey = activeKey.slice(0);
          newActiveKey.push(key);
        }
      } else {
        newActiveKey = hasKey ? [] : [key];
      }
      isActive = newActiveKey.indexOf(key) > -1;
    } else {
      newActiveKey = activeKey === key ? '' : key;
      isActive = activeKey === key;
    }

    if (!('activeKey' in this.props)) {
      this.setState({
        activeKey: newActiveKey,
      });
    }

    typeof onItemChange === 'function' && onItemChange(isActive);
    typeof onChange === 'function' && onChange(newActiveKey);
  };

  renderItems = () => {
    const { animated, activeKey } = this.state;
    return Children.map(
      this.props.children,
      (ele: ReactElement<CollapseItemProps>) => {
        const { disabled, onChange } = ele.props;
        const { key } = ele;
        const currentKey = key && String(key);
        const isActive = activeKey.indexOf(currentKey) > -1;
        return cloneElement(ele, {
          animated,
          itemKey: key!,
          isActive,
          onChange: () => !disabled && this.onItemChange(onChange, currentKey),
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
