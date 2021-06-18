import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from 'react-native';
import { BaseMaskProps } from './interface';
import maskStyle from './style/index.native';

export interface MaskProps extends BaseMaskProps {
  style?: CSSProperties;
  styles?: typeof maskStyle;
  onClick?: (event: GestureResponderEvent) => void;
}

const maskStyles = StyleSheet.create<any>(maskStyle);

export default class Mask extends PureComponent<MaskProps, any> {
  static defaultProps = {
    visible: false,
    type: 'normal',
    styles: maskStyles,
  };

  render() {
    const { visible, styles, type, style, onClick } = this.props;

    const popupCls = [styles!.wrapperStyle, styles![`${type}Wrapper`], style] as ViewStyle;

    return (
      visible && (
        <TouchableWithoutFeedback onPress={onClick}>
          <View style={[popupCls]} />
        </TouchableWithoutFeedback>
      )
    );
  }
}
