import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import panelStyle from './style/index.native';

export interface PanelProps {
    style?: CSSProperties;
}

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class Panel extends PureComponent<PanelProps, {}> {
  static defaultProps = {
    prefixCls: 'za-panel',
  };
  // static Header: any;
  // static Body: any;
  // static Footer: any;

  render() {
    const { children, style } = this.props;

    const wrapperStyle = [
        panelStyle!.container,
        style,
    ] as any[];

    return <View style={wrapperStyle}>{children}</View>;
  }
}
