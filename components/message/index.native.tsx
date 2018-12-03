import React, { PureComponent, CSSProperties } from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableHighlight,
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
    styles: messageStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
      isClose: false,
    };
  }

  _onPressClose = () => {
    this.setState({ isActive: false });
  }

  onPressIn = () => {
    this.setState({ isClose: true });
  }

  onPressOut = () => {
    this.setState({ isClose: false });
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

    const { isActive, isClose } = this.state;

    const wrapperStyle = [
      styles!.messageWrapper,
      isActive && styles!.messageWrapper,
      styles![`${theme}MessageBg`],
      styles![`${size}MessageWrapper`],
      isClose && styles![`${theme}MessageBg`],
      style,
    ] as ViewStyle;

    const textStyle = [
      styles![`${theme}MessageText`],
      size ? styles![`${size}MessageTextSize`] : styles!.messageTextSize,
    ];

    const arrowStyle = [
      styles!.arrowStyle,
      styles![`${theme}MessageArrow`],
    ];

    const closeWrapperStyle = [
      styles!.closeWrapperStyle,
      size && styles![`${size}CloseWrapperStyle`],
    ];

    const closeTextStyle = [
      styles![`${theme}MessageText`],
      isClose && styles![`${theme}MessageText`],
      size ? styles![`${size}CloseTextStyle`] : 
      styles!.closeTextStyle,
      size ? styles![`${size}MessageTextSize`] : styles!.messageTextSize,
      isClose && styles![`${theme}MessageText`],
      isClose && styles![`${theme}MessageBg`],
      isClose && styles!.messageTextSize,
      isClose && styles![`${size}MessageTextSize`],
      isClose && styles![`${size}CloseTextStyle`],
    ];

    const closeIconRender = closable &&
      <View style={closeWrapperStyle}>
        <TouchableHighlight
          onPress={this._onPressClose}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          activeOpacity={1}
        >
          <View style={styles!.textBodyStyle as ViewStyle}>
            <Text style={closeTextStyle}>关闭</Text>
          </View>
        </TouchableHighlight>
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
      activeOpacity: 1,
      onPress: onClick,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
    };

    return this.state.isActive && (
      onClick ?
      <TouchableHighlight {...wrapperProps}>
        {messageRender}
      </TouchableHighlight> : messageRender
    );
  }
}
