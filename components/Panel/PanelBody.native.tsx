import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import panelStyle from './style/index.native';

export interface PanelBodyProps {
  style?: CSSProperties;
  styles?: typeof panelStyle;
}

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class PanelHeader extends PureComponent<PanelBodyProps, {}> {

  static defaultProps = {
    prefixCls: 'za-panel',
    styles: panelStyles,
  };

  render() {
    const { styles, style, children } = this.props;

    const wrapperStyle = [
      styles!.panelBody,
      style,
    ] as ViewStyle;

    return <View style={wrapperStyle}>{children}</View>;
  }
}
