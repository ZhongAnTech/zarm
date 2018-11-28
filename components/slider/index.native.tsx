import React, { PureComponent, CSSProperties } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider,
  ViewStyle,
} from 'react-native';
import PropsType from './PropsType';
import sliderStyle from './style/index.native';

export interface SliderProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof sliderStyle;
}

const sliderStyles = StyleSheet.create<any>(sliderStyle);

export default class ZSlider extends PureComponent<SliderProps, any> {
  static defaultProps = {
    value: 0,
    defaultValue: 0,
    min: 0,
    max: 100,
    step: 0,
    disabled: false,
    styles: sliderStyles,
  };

  private slider;

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || 0,
      isVisible: false,
    };
  }

  /**
   * 停止拖动后完成回调
   */
  finishSlider = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    this.setState({
      isVisible: false,
    });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  onChangeValue = (value) => {
    this.setState({
      value,
      isVisible: true,
    });
  }

  /**
   * 计算tooltip的位置
   */
  locatedTooltip = () => {
    const { value, isVisible } = this.state;
    const { styles } = this.props;

    const offsetValue = this.getOffsetValue(value);

    const sliderTooltipBox = [
      styles!.tooltipBox,
    ] as ViewStyle;
    const sliderTooltip = [
      styles!.tooltipContent,
    ] as ViewStyle;
    const sliderTriangle = [
      styles!.tooltipTriangle,
    ] as ViewStyle;
    const sliderText = [
      styles!.tooltipText,
    ];

    let component;

    if (isVisible) {
      component = (
        <View style={[sliderTooltipBox, { left: offsetValue }]}>
          <View style={sliderTooltip}>
            <Text style={sliderText}>
              {parseInt(value, 10)}
            </Text>
          </View>
          <View >
            <View style={sliderTriangle} />
          </View>
        </View>
      );
    }
    return component;
  }

  /**
   * 获取偏移量
   */
  getOffsetValue = (value) => {
    const { min, max } = this.props;

    // 减去按钮的宽度(约值)
    return (this.slider - 32) * ((value - min) / (max - min));
  }

  /**
   * 获取原生slider组件的宽度
   */
  getLayout = (e) => {
    this.slider = e.layout.width;
  }

  render() {
    const {
      min,
      max,
      disabled,
      step,
      styles,
    } = this.props;
    const { value } = this.state;

    const sliderWrapper = [
      styles!.container,
    ] as ViewStyle;

    return (
      <View style={sliderWrapper} onLayout={({ nativeEvent: e }) => this.getLayout(e)}>
        {this.locatedTooltip()}
        <Slider
          value={value}
          step={step}
          minimumValue={min}
          maximumValue={max}
          disabled={disabled}
          minimumTrackTintColor="#12C287"
          onValueChange={this.onChangeValue}
          onSlidingComplete={this.finishSlider}
        />
      </View>
    );
  }
}
