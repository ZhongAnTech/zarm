import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import PropsType from './PropsType';
import buttonStyle from './style/index.native';

export interface ButtonProps extends PropsType {
  style?: CSSProperties;
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
    onClick() {},
  };

  render() {
    const { theme, size, style, shape, bordered, onClick, children, ...others } = this.props;

    const wrapperStyle = [
      buttonStyle!.wrapperStyle,
      buttonStyle![`${size}Wrapper`],
      buttonStyle![`${theme}Wrapper`],
      buttonStyle![`${shape}Wrapper`],
      bordered && buttonStyle!.borderedWrapper,
      bordered && buttonStyle![`${theme}BorderedWrapper`],
      style,
    ];

    const underlayColor = (StyleSheet.flatten(
      buttonStyle![`${theme}Highlight`],
    ) as any).backgroundColor;

    const textStyle = [
      buttonStyle!.textStyle,
      buttonStyle![`${size}Text`],
      buttonStyle![`${theme}Text`],
      bordered && buttonStyle![`${theme}BorderedText`],
    ];

    return (
      <TouchableHighlight
        activeOpacity={0.3}
        style={wrapperStyle}
        onPress={onClick}
        underlayColor={underlayColor}
      >
        <View style={buttonStyles!.container}>
          <Text style={textStyle}>{children}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
