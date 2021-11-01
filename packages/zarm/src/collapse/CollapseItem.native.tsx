import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated, ViewStyle } from 'react-native';
import type { BaseCollapseItemProps } from './interface';
import collapaseStyle from './style/index.native';
import variables from '../style/themes/default.native';

const collapseStyles = StyleSheet.create<any>(collapaseStyle);

export interface CollapseItemProps extends BaseCollapseItemProps {
  style?: CSSProperties;
  disabled?: boolean;
}

export default class CollapseItem extends PureComponent<CollapseItemProps, any> {
  static defaultProps = {
    animated: false,
    disabled: false,
  };

  // 标题的高度
  private titleHeight = variables.collapse_height;

  // 内容的高度
  private bodyHeight = 0;

  constructor(props) {
    super(props);
    this.state = {
      active: this.isActive(this.props),
      height: new Animated.Value(this.titleHeight),
      rotate: new Animated.Value(0),
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if ('isActive' in nextProps) {
      return {
        active: nextProps.isActive,
      };
    }
    return null;
  }

  componentDidUpdate() {
    this.animate();
  }

  getHeight = () => {
    return this.state.active ? this.titleHeight + this.bodyHeight : this.titleHeight;
  };

  getRotate = () => {
    return this.state.active ? 1 : 0;
  };

  onPress = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return null;
    }
    const { active } = this.state;
    if (typeof onChange === 'function') {
      onChange(active);
    }
  };

  onLayoutTrimmedText = (event) => {
    const { height } = event.nativeEvent.layout;
    this.bodyHeight = height;
    this.state.height.setValue(this.getHeight());
    this.state.rotate.setValue(this.getRotate());
  };

  isActive = (props) => {
    const { isActive } = props;
    return isActive;
  };

  animate = () => {
    const { animated } = this.props;
    const duration = animated ? 150 : 0;
    const height = this.getHeight();
    const rotate = this.getRotate();

    Animated.parallel([
      Animated.timing(this.state.height, {
        toValue: height,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.rotate, {
        toValue: rotate,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  render() {
    const { title, children, style, disabled } = this.props;
    const { height, rotate } = this.state;

    const disabledColorStyle = disabled ? collapseStyles!.titleTextDisabledStyle : null;
    const disabledBorderColorStyle = disabled ? collapseStyles!.titleArrowDisabledStyle : null;

    const wrapperStyle = [collapseStyles!.itemWrapperStyle, { height }, style];

    const titleStyle = [collapseStyles!.titleWrapperStyle];

    const titleInnerStyle = [collapseStyles!.titleInnerStyle] as ViewStyle;

    const titleTextStyle = [collapseStyles!.titleTextStyle, disabledColorStyle];

    const titleArrowStyle = [
      collapseStyles!.titleArrowStyle,
      {
        transform: [
          {
            rotate: rotate.interpolate({
              inputRange: [0, 1],
              outputRange: ['45deg', '-135deg'],
            }),
          },
        ],
        top: rotate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Math.sqrt(50) / 2],
        }),
      },
      disabledBorderColorStyle,
    ];

    const bodyStyle = [collapseStyles!.itemBodyStyle] as ViewStyle;

    return (
      <Animated.View style={wrapperStyle}>
        <TouchableHighlight
          style={collapseStyles!.touchStyle}
          onPress={this.onPress}
          underlayColor="#eee"
          activeOpacity={disabled ? 1 : 0.8}
        >
          <View style={titleStyle}>
            <View style={titleInnerStyle}>
              <Text style={titleTextStyle}>{title}</Text>
              <Animated.View style={titleArrowStyle} />
            </View>
          </View>
        </TouchableHighlight>
        <View onLayout={this.onLayoutTrimmedText} style={bodyStyle}>
          {children}
        </View>
      </Animated.View>
    );
  }
}
