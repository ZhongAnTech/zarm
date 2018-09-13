import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated,
  ViewStyle,
} from 'react-native';
import { BaseCollapseItemProps } from './PropsType';
import collapaseStyle from './style/index.native';

const collapseStyles = StyleSheet.create<any>(collapaseStyle);

export interface CollapseItemProps extends BaseCollapseItemProps {
  style?: CSSProperties;
  disabled?: boolean;
  index?: string;
}

export default class CollapseItem extends PureComponent<CollapseItemProps, any> {
  static defaultProps = {
    animated: false,
    disabled: false,
  };

  // 标题的高度
  private titleHeight = 52;
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

  componentWillReceiveProps(nextProps) {
    const { active } = this.state;
    if (active !== this.isActive(nextProps)) {
      this.setState({
        active: !active,
      }, () => {
        this.animate();
      });
    }
  }

  isActive(props) {
    const { index, activeKey } = props;
    return activeKey.indexOf(index) > -1;
  }

  getHeight = () => {
    return this.state.active ? this.titleHeight + this.bodyHeight : this.titleHeight;
  }

  getRotate = () => {
    return this.state.active ? 1 : 0;
  }

  onPress = () => {
    const { disabled, index, onItemChange } = this.props;
    if (disabled) {
      return null;
    }
    const { active } = this.state;
    this.setState({
      active: !active,
    } , () => {
      this.animate();
      if (onItemChange) {
        onItemChange(index);
      }
    });
  }

  animate() {
    const { animated } = this.props;
    const duration = animated ? 150 : 0;
    const height = this.getHeight();
    const rotate = this.getRotate();

    Animated.parallel([
      Animated.timing(this.state.height, {
        toValue: height,
        duration,
      }),
      Animated.timing(this.state.rotate, {
        toValue: rotate,
        duration: 150,
      }),
    ]).start();
  }

  onLayoutTrimmedText = (event) => {
    const {
      height,
    } = event.nativeEvent.layout;
    this.bodyHeight = height;
    this.state.height.setValue(this.getHeight());
    this.state.rotate.setValue(this.getRotate());
  }

  render() {
    const { title, children, style, disabled } = this.props;

    const disabledColorStyle = disabled ? collapseStyles!.titleTextDisabledStyle : null;
    const disabledBorderColorStyle = disabled ? collapseStyles!.titleArrowDisabledStyle : null;

    const wrapperStyle = [
      collapseStyles!.itemWrapperStyle,
      { height: this.state.height },
      style,
    ];

    const titleStyle = [
      collapseStyles!.titleWrapperStyle,
    ];

    const titleInnerStyle = [
      collapseStyles!.titleInnerStyle,
    ] as ViewStyle;

    const titleTextStyle = [
      collapseStyles!.titleTextStyle,
      disabledColorStyle,
    ];

    const titleArrowStyle = [
      collapseStyles!.titleArrowStyle,
      {
        transform: [
          {
            rotate: this.state.rotate.interpolate({
              inputRange: [0, 1],
              outputRange: ['45deg', '-135deg'],
            }),
          },
        ],
        top: this.state.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: [ 0 , Math.sqrt(50) / 2 ],
        }),
      },
      disabledBorderColorStyle,
    ];

    const bodyStyle = [
      collapseStyles!.itemBodyStyle,
    ] as ViewStyle;

    return (
      <Animated.View style={wrapperStyle} >
        <TouchableHighlight
          style={collapseStyles!.touchStyle}
          onPress={this.onPress}
          underlayColor="#EEE"
          activeOpacity={disabled ? 1 : 0.8}
        >
          <View style={titleStyle}>
            <View style={titleInnerStyle}>
              <Text style={titleTextStyle}>{title}</Text>
              <Animated.View style={titleArrowStyle} />
            </View>
          </View>
        </TouchableHighlight>
        <View
          onLayout={this.onLayoutTrimmedText}
          style={bodyStyle}
        >
          {children}
        </View>
      </Animated.View>
    );
  }
}
