import React, { PureComponent, CSSProperties } from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import type { BaseMessageProps } from './interface';
import messageStyle from './style/index.native';
import { RenderWithText } from '../utils/renderWithText.native';

export interface MessageProps extends BaseMessageProps {
  style?: CSSProperties;
  styles?: typeof messageStyle;
  onClick?: (event: GestureResponderEvent) => void;
}

export interface MessageState {
  visible?: boolean;
}

const messageStyles = StyleSheet.create<any>(messageStyle);

export default class Message extends PureComponent<MessageProps, MessageState> {
  static defaultProps = {
    theme: 'primary',
    size: 'md',
    hasArrow: false,
    closable: false,
    styles: messageStyles,
  };

  constructor(props: MessageProps) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  onPressClose = () => {
    this.setState({ visible: false });
  };

  render() {
    const { theme, icon, hasArrow, closable, styles, style, onClick, children } = this.props;

    const { visible } = this.state;

    const wrapperStyle = [styles!.wrapper, styles![`${theme}Wrapper`], style] as ViewStyle;

    const textStyle = [styles!.textStyle, styles![`${theme}TextStyle`]];

    const arrowStyle = [styles!.arrowStyle, styles![`${theme}ArrowStyle`]];

    const closeIconStyle = [styles!.closeIconStyle, styles![`${theme}CloseIconStyle`]];

    const closeRender = closable && (
      <TouchableWithoutFeedback onPress={this.onPressClose}>
        <View style={styles!.closeIconWrapperStyle as ViewStyle}>
          <View style={[closeIconStyle, styles!.closeIconLeft]} />
          <View style={[closeIconStyle, styles!.closeIconRight]} />
        </View>
      </TouchableWithoutFeedback>
    );

    const arrowRender = hasArrow && (
      <View style={styles!.arrowWrapperStyle as ViewStyle}>
        <View style={arrowStyle} />
      </View>
    );

    const footerRender = (closable || hasArrow) && (
      <View style={styles!.footerStyle as ViewStyle}>
        {closeRender}
        {arrowRender}
      </View>
    );

    const messageRender = (
      <View style={wrapperStyle}>
        {icon && <View style={styles!.headerStyle as ViewStyle} />}
        <RenderWithText
          viewStyle={styles!.bodyStyle as ViewStyle}
          textStyle={textStyle}
          component={children}
        />
        {footerRender}
      </View>
    );

    const wrapperProps = {
      onPress: onClick,
    };

    return (
      visible &&
      (onClick ? (
        <TouchableWithoutFeedback {...wrapperProps}>{messageRender}</TouchableWithoutFeedback>
      ) : (
        messageRender
      ))
    );
  }
}
