import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import PropsType from './PropsType';
import cellStyle from './style/index.native';
import { RenderWithText } from '../utils/renderWithText.native';

export interface CellProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof cellStyle;
  onClick?: (event: GestureResponderEvent) => void;
}

const cellStyles = StyleSheet.create<any>(cellStyle);

export default class Cell extends PureComponent<CellProps, any> {
  static defaultProps = {
    hasArrow: false,
    styles: cellStyles,
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
      hasArrow,
      icon,
      title,
      description,
      help,
      style,
      styles,
      onClick,
      children,
      ...others
    } = this.props;
    const { isActive } = this.state;

    const wrapperStyle = [
      styles!.wrapperStyle,
      isActive && styles!.activeWrapper,
      style,
    ] as ViewStyle;

    const titleViewStyle = [
      styles!.titleViewStyle,
      !!children && styles!.labelTitleViewStyle,
    ] as ViewStyle;

    const contentStyle = (!onClick && wrapperStyle) as ViewStyle;
    const iconRender = icon && <View style={styles!.iconStyle}>{icon}</View>;
    const arrowRender = hasArrow && <View style={styles!.arrowStyle} />;

    const cellRender = (
      <View style={wrapperStyle}>
        <View style={styles!.lineContainerStyle}>
          <View style={styles!.lineStyle} />
        </View>
        <View style={styles!.innerStyle as ViewStyle}>
          <View style={styles!.contentStyle as ViewStyle}>
            {iconRender}
            <View style={styles!.bodyStyle as ViewStyle}>
              <RenderWithText
                component={title}
                viewStyle={titleViewStyle}
                textStyle={styles!.titleTextStyle}
              />
              <RenderWithText
                component={children}
                viewStyle={styles!.childrenViewStyle}
              />
            </View>
            <RenderWithText
              component={description}
              textStyle={styles!.descriptionTextStyle}
            />
            {arrowRender}
          </View>
        </View>
        <RenderWithText
          component={help}
          viewStyle={cellStyles.helpViewStyle}
        />
      </View>
    );

    const wrapperProps = {
      activeOpacity: 1,
      style: contentStyle,
      onPress: onClick,
      onPressIn: this.onPressIn,
      onPressOut: this.onPressOut,
      ...others,
    };

    return onClick
      ? <TouchableHighlight {...wrapperProps}>{cellRender}</TouchableHighlight>
      : cellRender;
  }
}
