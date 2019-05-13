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
    theme: 'danger',
    sup: false,
    styles: badgeStyles,
  };

  state = {
    dotWidth: 0,
  };

  layout = (e) => {
    const dotWidth = (this.props.shape === 'dot' || this.props.shape === undefined)
      ? -(parseInt(e.layout.width, 10) - 4)
      : -(parseInt(e.layout.width, 10) - 8);

    this.setState({
      dotWidth,
    });
  };

  render() {
    const {
      theme,
      shape,
      sup,
      text,
      style,
      children,
      styles,
    } = this.props;
    const { dotWidth } = this.state;

    const bagdeWrapper = [
      styles!.textStyle,
      style,
    ] as ViewStyle;

    const badgeText = [
      styles!.badgeText,
      styles![`${shape}Text`],
      shape === undefined && styles!.dotText,
    ];

    const iconStyle = [
      styles![`${shape}Badge`],
      styles![`${theme}Bagde`],
      sup && [badgeStyles.sup],
      shape === undefined && styles!.dotBadge,
    ] as ViewStyle;

    return (
      <View style={bagdeWrapper}>
        {children}
        <View
          onLayout={({ nativeEvent: e }) => this.layout(e)}
          style={[iconStyle, { right: sup ? dotWidth : 0 }]}
        >
          <Text style={badgeText}>{text}</Text>
        </View>
      </View>
    );
  }
}
