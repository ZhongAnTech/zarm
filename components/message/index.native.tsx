import React, { PureComponent, CSSProperties } from 'react';
import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import PropsType from './PropsType';
import messageStyle from './style/index.native';
import { RenderWithText } from '../utils/renderWithText.native';

export interface MessageProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof messageStyle;
  onClick?: (event: GestureResponderEvent) => void;
}

const messageStyles = StyleSheet.create<any>(messageStyle);

export default class Message extends PureComponent<MessageProps, any> {
  static defaultProps = {
    theme: 'primary',
    hasArrow: false,
    closable: false,
    size: 'md',
    styles: messageStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      isActive: false,
    };
  }

  _onPressClose = () => {
    this.setState({ visible: false });
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
      hasArrow,
      closable,
      styles,
      style,
      onClick,
      children,
      size,
    } = this.props;

    const { visible, isActive } = this.state;

    const wrapperStyle = [
      styles!.messageWrapper,
      styles!.messageWrapperInner,
      styles![`${theme}MessageBg`],
      styles![`${size}MessageWrapper`],
      isActive && styles![`${theme}MessageBg`],
      style,
    ] as ViewStyle;

    const textStyle = [
      styles![`${theme}MessageText`],
      size ? styles![`${size}MessageTextSize`] : styles!.messageTextSize,
    ];

    const arrowStyle = [
      styles!.arrowStyle,
      styles![`${theme}MessageArrow`],
      size && styles![`${size}ArrowStyle`],
    ];

    const closeWrapperStyle = [
      styles!.closeWrapperStyle,
      size && styles![`${size}CloseWrapperStyle`],
    ];

    const closeIconWrapper = [
      styles!.closeIconWrapper,
      size && styles![`${size}CloseIconWrapper`],
    ];

    const closeIconLeftStyle = [
      styles!.closeIconLeft,
      styles![`${theme}CloseBg`],
      size && styles![`${size}CloseIconLeft`],
    ];

    const closeIconRightStyle = [
      styles!.closeIconRight,
      styles![`${theme}CloseBg`],
      size && styles![`${size}CloseIconRight`],
    ];

    const closeIconRender = closable &&
      <View style={closeWrapperStyle}>
        <TouchableWithoutFeedback
          onPress={this._onPressClose}
        >
          <View style={closeIconWrapper}>
            <View style={closeIconLeftStyle} />
            <View style={closeIconRightStyle as ViewStyle} />
          </View>
        </TouchableWithoutFeedback>
      </View>;

    const arrowRender = hasArrow && <View style={arrowStyle} />;

    const messageRender = (
      <View style={wrapperStyle}>
        <View style={styles!.textBodyStyle as ViewStyle}>
          <RenderWithText
            viewStyle={styles!.textChildrenStyle as ViewStyle}
            textStyle={textStyle}
            component={children}
          />
        </View>
        <View style={styles!.footerWrapperStyle as ViewStyle}>
          {closeIconRender}
          {arrowRender}
        </View>
      </View>
    );

    const wrapperProps = {
      onPress: onClick,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
    };

    return visible && (
      onClick ?
      <TouchableWithoutFeedback {...wrapperProps}>
        {messageRender}
      </TouchableWithoutFeedback> : messageRender
    );
  }
}
