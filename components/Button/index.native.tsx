import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    const {
      styles,
      children,
    } = this.props;

    return (
      <View style={styles!.container}>
        <Text>{children}</Text>
      </View>
    );
  }
}
