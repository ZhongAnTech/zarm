import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import panelStyle from './style/index.native';
import { BasePanelHeaderProps } from './PropsType';

export interface PanelBodyProps {
    style?: CSSProperties;
}

const panelStyles = StyleSheet.create<any>(panelStyle);

export default class PanelHeader extends PureComponent<PanelBodyProps, {}> {

  static defaultProps = {
    prefixCls: 'za-panel',
  };

  render() {
    const { style, children } = this.props;

    const wrapperStyle = [
        panelStyles!.panelBody,
        style,
    ]  as any[];
    return (
      <View style={wrapperStyle}>
        {children}
      </View>
    );
  }
}
