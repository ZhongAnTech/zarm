import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
} from 'react-native';
import PropsType from './PropsType';
import badgeStyle from './style/index.native';

export interface BadgeProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof badgeStyle;
}

const badgeStyles = StyleSheet.create<any>(badgeStyle);

export default class Badge extends PureComponent<BadgeProps, {}> {
  static defaultProps = {
    theme: 'error',
    sup: false,
    styles: badgeStyles,
  };

  state = {
    dotWidth: 0,
  };

  layout = (e) => {
    let dotWidth = -parseInt(e.layout.width, 10) / 2;
    this.setState({
      dotWidth,
    });
  }

  render() {
    const { styles } = this.props;

    const {
      theme,
      shape,
      sup,
      text,
      style,
      children,
    } = this.props;

    const bagdeWrapper = [
      styles!.TextStyle,
      style,
    ] as ViewStyle;

    const dotText = [
      styles!.dotText,
      styles![`${shape}Text`],
    ];

    const shapeStyle = [
      styles![`${shape}Shape`],
      styles![`${theme}Theme`],
      sup && styles![`${shape}Sup`],
    ] as ViewStyle;

    return (
      <View style={bagdeWrapper}>
        {children}
        <View
          onLayout={({ nativeEvent: e }) => this.layout(e)}
          style={[shapeStyle, { right: sup ? this.state.dotWidth : 0 }]}
        >
          <Text style={dotText}>{text}</Text>
        </View>
      </View>
    );
  }
}
