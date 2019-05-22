import React, { PureComponent, CSSProperties, Children, cloneElement, ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BaseCollapseProps } from './PropsType';
import collapaseStyle from './style/index.native';
import { isArray } from '../utils/validate';
import { CollapseItemProps } from './CollapseItem.native';

export interface CollapseProps extends BaseCollapseProps {
  style?: CSSProperties;
  styles?: typeof collapaseStyle;
  activeKey?: any;
}

const collapseStyles = StyleSheet.create<any>(collapaseStyle);

export default class Collapse extends PureComponent<CollapseProps, any> {
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
      activeKey: this.getactiveKey(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeKey } = this.props;

    if (!this.isPropEqual(activeKey, nextProps.activeKey)) {
      this.setState({
        activeKey: this.getactiveKey(nextProps),
      });
    }
  }

  onChange = (key) => {
    const { multiple, onChange } = this.props;
    const { activeKey } = this.state;
    const hasKey = activeKey.indexOf(key) > -1;
    let newactiveKey: Array<string> = [];
    if (multiple) {
      if (hasKey) {
        newactiveKey = activeKey.filter(i => i !== key);
      } else {
        newactiveKey = activeKey.slice(0);
        newactiveKey.push(key);
      }
    } else {
      newactiveKey = hasKey ? [] : [key];
    }
    this.setState({
      activeKey: newactiveKey,
    });
    onChange(key);
  };

  getactiveKey = (props) => {
    const { activeKey, defaultActiveKey, multiple } = props;
    const defaultKey = (activeKey || activeKey === 0) ? activeKey : defaultActiveKey;
    if (defaultKey || defaultKey === 0) {
      if (isArray(defaultKey)) {
        return !multiple
          ? [String(defaultKey[0])] : (defaultKey as Array<any>).map(key => String(key));
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

  renderItems() {
    const { animated, children } = this.props;
    const { activeKey } = this.state;

    return Children.map(children, (ele: ReactElement<CollapseItemProps>, index) => {
      const { itemKey } = ele.props;
      const key = Object.prototype.toString.call(itemKey) !== '[object Undefined]' ? String(itemKey) : String(index);
      const isActive = activeKey.indexOf(key) > -1;
      return cloneElement(ele, {
        itemKey: key,
        isActive,
        animated,
        onChange: this.onChange,
      });
    });
  }

  render() {
    const { style, styles } = this.props;

    const wrapperStyle = [
      styles!.container,
      style,
    ] as ViewStyle;

    return (
      <View style={wrapperStyle}>
        {this.renderItems()}
      </View>
    );
  }
}
