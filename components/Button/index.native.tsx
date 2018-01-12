import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import PropsType from './PropsType';
import buttonStyle from './style/index.native';

export interface ButtonProps extends PropsType {
  style?: CSSProperties;
}

const buttonStyles = StyleSheet.create<any>(buttonStyle);

export default class Button extends PureComponent<ButtonProps, any> {
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

  constructor(props) {
    super(props);
    this.state = {
      isActive: props.active,
    };
  }

  onPressIn = () => {
    this.setState({ isActive: true });
  }

  onPressOut = () => {
    this.setState({ isActive: false });
  }

  render() {
    const { theme, size, style, shape, bordered, active, disabled, onClick, children, ...others } = this.props;
    const isActive = this.state.isActive;

    const wrapperStyle = [
      buttonStyle!.wrapperStyle,
      buttonStyle![`${size}Wrapper`],
      buttonStyle![`${theme}Wrapper`],
      buttonStyle![`${shape}Wrapper`],
      shape === 'circle' && buttonStyle![`${size}CircleWrapper`],
      isActive && buttonStyle![`${theme}BorderedActive`],
      bordered && buttonStyle![`${theme}BorderedWrapper`],
      bordered && buttonStyle!.borderedWrapper,
      disabled && buttonStyle!.disabledWrapper,
      style,
    ];

    const underlayColor = (StyleSheet.flatten(
      bordered
        ? buttonStyle![`${theme}BorderedActive`]
        : buttonStyle![`${theme}Active`],
    ) as any).backgroundColor;

    const textStyle = [
      buttonStyle!.textStyle,
      buttonStyle![`${size}Text`],
      buttonStyle![`${theme}Text`],
      bordered && buttonStyle![`${theme}BorderedText`],
    ];

    const content = (
      <View style={buttonStyles!.container}>
        <Text style={textStyle}>{children}</Text>
      </View>
    );

    const wrapperProps = {
      activeOpacity: 0.3,
      style: wrapperStyle,
      onPress: onClick,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      disabled,
      ...others,
    };

    return bordered
      ? <TouchableOpacity {...wrapperProps} activeOpacity={0.6}>{content}</TouchableOpacity>
      : <TouchableHighlight {...wrapperProps} underlayColor={underlayColor}>{content}</TouchableHighlight>;
  }
}
