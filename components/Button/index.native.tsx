import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const buttonStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default class Button extends PureComponent<{}> {
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
      theme,
      size,
      shape,
      icon,
      block,
      active,
      focus,
      bordered,
      disabled,
      loading,
      onClick,
      styles,
      children,
    } = this.props;

    return (
      <View style={styles.container}>
        <Text>{children}</Text>
      </View>
    );
  }
}
