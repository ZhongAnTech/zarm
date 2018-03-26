import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import panelStyle from './style/index.native';

export interface PanelProps {
  style?: CSSProperties;
  styles?: typeof panelStyle;
}

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class Panel extends PureComponent<PanelProps, {}> {

  static Header: any;
  static Body: any;
  static Footer: any;

  static defaultProps = {
    prefixCls: 'za-panel',
    styles: panelStyles,
  };

  render() {
    const { children, style, styles } = this.props;

    const wrapperStyle = [
      styles!.container,
      style,
    ] as ViewStyle;

    return <View style={wrapperStyle}>{children}</View>;
  }
}
