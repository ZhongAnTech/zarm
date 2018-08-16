import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import PropsType from './PropsType';
import switchStyle from './style/index.native';

export interface SwitchProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof switchStyle;
}

const switchStyles = StyleSheet.create<any>(switchStyle);

const OFFSET = 4;
const ANIMATE_STEP = 75;
const ANIMATE_DURATION = 200;

const getChecked = (props, defaultChecked) => {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
};

export default class Switch extends PureComponent<SwitchProps, any> {
  static defaultProps = {
    disabled: false,
    checked: false,
    defaultChecked: false,
    styles: switchStyles,
  };

  constructor(props) {
    super(props);
    const checked = getChecked(props, false);
    this.state = {
      checked,
      transformSwitch: new Animated.Value(
        checked
          ? this.getAnimateValue('right')
          : this.getAnimateValue('left'),
      ),
      backgroundColor: new Animated.Value(
        checked ? ANIMATE_STEP : -ANIMATE_STEP,
      ),
    };
  }
  getAnimateValue(direction) {
    const circleStyle = StyleSheet.flatten(this.props.styles!.circleStyle);
    const circleWidth = circleStyle.width as number;
    return direction === 'right'
            ? circleWidth / 2 - OFFSET
            : circleWidth * -1 / 2 + OFFSET;
  }
  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onValueChange = () => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    const checked = !this.state.checked;
    this.animateSwitch(checked);
    this.setState({ checked });
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  }
  animateSwitch = (value) => {
    const { transformSwitch, backgroundColor } = this.state;
    Animated.parallel([
      Animated.spring(transformSwitch, {
        toValue: value
          ? this.getAnimateValue('right')
          : this.getAnimateValue('left'),
      }),
      Animated.timing(backgroundColor, {
        toValue: value ? ANIMATE_STEP : -ANIMATE_STEP,
        duration: ANIMATE_DURATION,
      }),
    ]).start();
  }
  render() {
    const { styles, disabled } = this.props;
    const { checked, backgroundColor, transformSwitch } = this.state;
    const stylesProps = {
      wrapperStyle: styles!.wrapperStyle,
      wrapperInActive: styles!.wrapperInActive,
      wrapperActive: styles!.wrapperActive,
      circleStyle: styles!.circleStyle,
      circleInActive: styles!.circleInActive,
      circleActive: styles!.circleActive,
      disabledWrapperStyle: styles!.disabledWrapperStyle,
    };
    const activeBackgroundColor = StyleSheet.flatten(stylesProps.wrapperActive).backgroundColor;
    const inActiveBackgroundColor = StyleSheet.flatten(stylesProps.wrapperInActive).backgroundColor;

    const interpolatedBgColorAnimation = backgroundColor.interpolate({
      inputRange: [-ANIMATE_STEP, ANIMATE_STEP],
      outputRange: [
        inActiveBackgroundColor,
        activeBackgroundColor,
      ],
    });

    const wrapperStyle = [
      stylesProps.wrapperStyle,
      disabled ? stylesProps.disabledWrapperStyle : {},
      checked ? stylesProps.wrapperActive : stylesProps.wrapperInActive,
      {
        backgroundColor: interpolatedBgColorAnimation,
      },
    ];
    const circleStyle = [
      stylesProps.circleStyle,
      checked ? stylesProps.circleActive : stylesProps.circleInActive,
      {
        left: transformSwitch,
      },
    ];
    return (
      <TouchableWithoutFeedback onPress={this.onValueChange}>
        {/* 背景 */}
        <Animated.View style={wrapperStyle}>
            {/* 圆形开关 */}
            <Animated.View style={circleStyle} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
