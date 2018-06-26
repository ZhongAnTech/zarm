import React, { PureComponent, CSSProperties } from 'react';
import {
    StyleSheet,
    View,
    ViewStyle,
    TouchableWithoutFeedback,
} from 'react-native';
import PropsType from './PropsType';
import maskStyle from './style/index.native';

export interface MaskProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof maskStyle;
}

const maskStyles = StyleSheet.create<any>(maskStyle);

export default class Mask extends PureComponent<MaskProps, any> {
  static defaultProps = {
    visible: false,
    type: 'normal',
    styles: maskStyles,
  };

  render(): any {
    const {
      visible,
      styles,
      type,
      style,
      onClose,
    } = this.props;

    const popupCls = [
      styles!.wrapperStyle,
      styles![`${type}Wrapper`],
      style,
    ] as ViewStyle;

    return visible
      && <TouchableWithoutFeedback onPress={onClose}><View style={[popupCls]} /></TouchableWithoutFeedback>;
  }
}
