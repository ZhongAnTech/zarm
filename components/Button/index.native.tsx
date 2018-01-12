import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
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

  componentWillReceiveProps(nextProps) {
    if ('active' in nextProps) {
      this.setState({ isActive: nextProps.active });
    }
  }

  onPressIn = () => {
    this.setState({ isActive: true });
  }

  onPressOut = () => {
    this.setState({ isActive: false });
  }

  render() {
    const {
      theme,
      size,
      shape,
      bordered,
      active,
      disabled,
      loading,
      icon,
      style,
      onClick,
      children,
      ...others,
    } = this.props;
    const isActive = this.state.isActive;

    const wrapperStyle = [
      buttonStyle!.wrapperStyle,
      buttonStyle![`${size}Wrapper`],
      buttonStyle![`${theme}Wrapper`],
      buttonStyle![`${shape}Wrapper`],
      isActive && buttonStyle![`${theme}ActiveWrapper`],
      bordered && buttonStyle![`${theme}BorderedWrapper`],
      bordered && buttonStyle!.borderedWrapper,
      disabled && buttonStyle!.disabledWrapper,
      shape === 'circle' && buttonStyle![`${size}CircleWrapper`],
      style,
    ];

    const underlayColor = (StyleSheet.flatten(
      buttonStyle![`${theme}ActiveWrapper`],
    ) as any).backgroundColor;

    const iconColor = (StyleSheet.flatten(
      buttonStyle!.activeText,
    ) as any).color;

    const textStyle = [
      buttonStyle!.textStyle,
      buttonStyle![`${size}Text`],
      buttonStyle![`${theme}Text`],
      bordered && buttonStyle![`${theme}BorderedText`],
      isActive && active && buttonStyle!.activeText,
    ];

    const iconStyle = [
      buttonStyle!.iconStyle,
      buttonStyle![`${size}Icon`],
    ];

    const iconRender = loading
      ? <ActivityIndicator animating style={iconStyle} color={iconColor} size="small" />
      : icon;

    const contentRender = (
      <View style={buttonStyles!.container}>
        {iconRender}
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
      ? <TouchableOpacity {...wrapperProps} activeOpacity={0.6}>{contentRender}</TouchableOpacity>
      : <TouchableHighlight {...wrapperProps} underlayColor={underlayColor}>{contentRender}</TouchableHighlight>;
  }
}
