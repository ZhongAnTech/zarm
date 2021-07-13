import React, { Component, CSSProperties, Children, cloneElement, ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import type { BaseCollapseProps } from './interface';
import collapaseStyle from './style/index.native';
import { isArray } from '../utils/validate';
import { CollapseItemProps } from './CollapseItem.native';

export interface CollapseProps extends BaseCollapseProps {
  style?: CSSProperties;
  styles?: typeof collapaseStyle;
  activeKey?: any;
}

const collapseStyles = StyleSheet.create<any>(collapaseStyle);

const isPropEqual = (cur, next) => {
  if (isArray(next) && isArray(cur)) {
    return next.length === cur.length && next.every((key, i) => key === cur[i]);
  }
  return cur === next;
};

const getActiveKey = (props) => {
  const { activeKey, defaultActiveKey, multiple } = props;

  const defaultKey = activeKey || activeKey === 0 ? activeKey : defaultActiveKey;

  if (defaultKey || defaultKey === 0) {
    if (isArray(defaultKey)) {
      return !multiple
        ? [String(defaultKey[0])]
        : (defaultKey as Array<any>).map((key) => String(key));
    }
    return [String(defaultKey)];
  }
  return [];
};

export default class Collapse extends Component<CollapseProps, any> {
  static defaultProps = {
    multiple: false,
    animated: false,
    styles: collapseStyles,
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

  onChange = (onItemChange, key) => {
    const { multiple, onChange } = this.props;
    const { activeKey } = this.state;
    const hasKey = activeKey.indexOf(key) > -1;
    let newactiveKey: Array<string> = [];
    if (multiple) {
      if (hasKey) {
        newactiveKey = activeKey.filter((i) => i !== key);
      } else {
        newactiveKey = activeKey.slice(0);
        newactiveKey.push(key);
      }
    } else {
      newactiveKey = hasKey ? [] : [key];
    }

    if (typeof onItemChange === 'function') {
      const isActive = newactiveKey.indexOf(key) > -1;
      onItemChange(isActive);
    }

    this.setState({
      activeKey: newactiveKey,
    });
    typeof onChange === 'function' && onChange(key);
  };

  renderItems() {
    const { animated, children } = this.props;
    const { activeKey } = this.state;

    return Children.map(children, (ele: ReactElement<CollapseItemProps>) => {
      const { disabled, onChange } = ele.props;
      const { key } = ele;
      const isActive = activeKey.indexOf(key) > -1;
      return cloneElement(ele, {
        key: key!,
        isActive,
        animated,
        onChange: disabled ? () => {} : () => this.onChange(onChange, key),
      });
    });
  }

  render() {
    const { style, styles } = this.props;

    const wrapperStyle = [styles!.container, style] as ViewStyle;

    return <View style={wrapperStyle}>{this.renderItems()}</View>;
  }
}
