import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import PropsType from './PropsType';
import buttonStyle from './style/index.native';

export interface ButtonProps extends PropsType {
  styles?: typeof buttonStyle;
}

const buttonStyles = StyleSheet.create<any>(buttonStyle);

export default class Button extends PureComponent<ButtonProps, {}> {
  static defaultProps = {
    prefixCls: 'za-button',
    theme: 'default',
    size: 'md',
    block: false,
    bordered: false,
    active: false,
    focus: false,
    disabled: false,
    loading: false,
    styles: buttonStyles,
    onClick() {},
  };

  render() {
    const { theme, size, styles, children, ...others } = this.props;

    const wrapperStyle = [
      styles!.wrapperStyle,
      styles![`${size}Size`],
      styles![`${theme}Theme`],
    ];

    const textStyle = [
      styles!.textStyle,
      styles![`${size}SizeText`],
      styles![`${theme}ThemeText`],
    ];

    return (
      <TouchableHighlight
        activeOpacity={1}
        style={wrapperStyle}
        {...others}
      >
        <View style={styles!.container}>
          <Text style={textStyle}>{children}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
