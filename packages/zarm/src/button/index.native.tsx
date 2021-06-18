import React, { PureComponent, CSSProperties, isValidElement } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import buttonStyle from './style/index.native';
import type { BaseButtonProps } from './interface';

export interface ButtonProps extends BaseButtonProps {
  style?: CSSProperties;
  styles?: typeof buttonStyle;
  onClick?: (event: GestureResponderEvent) => void;
}

const buttonStyles = StyleSheet.create<any>(buttonStyle);

export default class Button extends PureComponent<ButtonProps, any> {
  static defaultProps = {
    theme: 'default',
    size: 'md',
    shape: 'radius',
    block: false,
    ghost: false,
    disabled: false,
    loading: false,
    styles: buttonStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  onPressIn = () => {
    this.setState({ isActive: true });
  };

  onPressOut = () => {
    this.setState({ isActive: false });
  };

  render() {
    const {
      theme,
      size,
      shape,
      ghost,
      disabled,
      loading,
      icon,
      style,
      styles,
      onClick,
      children,
      ...others
    } = this.props;
    const { isActive } = this.state;

    const wrapperStyle = [
      styles!.wrapperStyle,
      styles![`${size}Wrapper`],
      styles![`${theme}Wrapper`],
      styles![`${shape}Wrapper`],
      isActive && styles![`${theme}ActiveWrapper`],
      ghost && styles!.ghostWrapper,
      ghost && styles![`${theme}GhostWrapper`],
      ghost && isActive && styles![`${theme}GhostActiveWrapper`],
      disabled && styles!.disabledWrapper,
      disabled && ghost && styles!.disabledGhostWrapper,
      shape === 'circle' && styles![`${size}CircleWrapper`],
      style,
    ];

    const underlayColor = (StyleSheet.flatten(styles![`${theme}ActiveWrapper`]) as any)
      .backgroundColor;

    const textStyle = [
      styles!.textStyle,
      styles![`${size}Text`],
      styles![`${theme}Text`],
      isActive && styles![`${theme}ActiveText`],
      disabled && styles![`${theme}DisabledText`],
      ghost && styles![`${theme}GhostText`],
      isActive && ghost && styles![`${theme}GhostActiveText`],
      disabled && ghost && styles!.disabledGhostText,
    ];

    const iconStyle = [styles!.iconStyle, styles![`${size}Icon`]];

    const iconRender = loading ? (
      <ActivityIndicator animating style={iconStyle} size="small" />
    ) : (
      icon
    );

    const contentRender = (
      <View style={styles!.container as ViewStyle}>
        {iconRender}
        {isValidElement(children) ? children : <Text style={textStyle}>{children}</Text>}
      </View>
    );

    const wrapperProps = {
      activeOpacity: 1,
      style: wrapperStyle,
      onPress: onClick,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      disabled,
      ...others,
    };

    return ghost ? (
      <TouchableOpacity {...wrapperProps}>{contentRender}</TouchableOpacity>
    ) : (
      <TouchableHighlight {...wrapperProps} underlayColor={underlayColor}>
        {contentRender}
      </TouchableHighlight>
    );
  }
}
