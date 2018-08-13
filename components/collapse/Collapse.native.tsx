import React, { PureComponent, CSSProperties, Children, cloneElement } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { BaseCollapseProps } from './PropsType';
import collapaseStyle from './style/index.native';
import { isArray } from '../utils/validate';

export interface CollapseProps extends BaseCollapseProps {
  style?: CSSProperties;
  styles?: typeof collapaseStyle;
}

const collapseStyles = StyleSheet.create<any>(collapaseStyle);

export default class Collapse extends PureComponent<CollapseProps, any> {
  static defaultProps = {
    multiple: true,
    animated: false,
    styles: collapseStyles,
    onChange: () => {},
  };

  static Item: any;

  constructor(props) {
    super(props);
    this.state = {
        activeIndex: this.getActiveIndex(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.isPropEqual(this.props.activeIndex, nextProps.activeIndex)) {
      this.setState({
          activeIndex: this.getActiveIndex(nextProps),
      });
    }
  }

  onItemChange = (key) => {
    const { multiple, onChange } = this.props;
    const { activeIndex } = this.state;
    const hasKey = activeIndex.indexOf(key) > -1;
    let newActiveIndex: Array<string> = [];
    if (multiple) {
      if (hasKey) {
        newActiveIndex = activeIndex.filter(i => i !== key);
      } else {
        newActiveIndex = activeIndex.slice(0);
        newActiveIndex.push(key);
      }
    } else {
      newActiveIndex = hasKey ? [] : [key];
    }
    this.setState({
      activeIndex: newActiveIndex,
    });
    onChange(Number(key));
  }

  getActiveIndex(props) {
    const { activeIndex, defaultActiveIndex, multiple } = props;

    const defaultIndex = (activeIndex || activeIndex === 0) ? activeIndex : defaultActiveIndex;

    if (defaultIndex || defaultIndex === 0) {
      if (isArray(defaultIndex)) {
        return !multiple ?
        [String(defaultIndex[0])] : (defaultIndex as Array<any>).map(key => String(key));
      } else {
        return [String(defaultIndex)];
      }
    }

    return [];
  }

  isPropEqual(cur, next) {
    if (isArray(next) && isArray(cur)) {
      return next.length === cur.length && next.every((key, i) => key === cur[i]);
    }

    return cur === next;
  }

  renderItems() {
    const { animated } = this.props;
    const { activeIndex } = this.state;
    return Children.map(this.props.children, (ele, index) => {
      return cloneElement(ele as JSX.Element, {
        index: String(index),
        animated,
        activeIndex,
        onItemChange: this.onItemChange,
      });
    });
  }

  render() {
    const {
      style,
      styles,
    } = this.props;

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
