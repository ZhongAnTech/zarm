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
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    styles: sliderStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue || 0,
    };
  }

  finishSlider = () => {
    const { onChange } = this.props;
    const { value } = this.state;
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  onChangeValue = (value) => {
    this.setState({ value });
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
      styles!.textStyle,
    ] as ViewStyle;

    return (
      <View style={sliderWrapper}>
        <Text>
          {value}
        </Text>
        <Slider
          step={step}
          minimumValue={min}
          maximumValue={max}
          disabled={disabled}
          onValueChange={this.onChangeValue}
          onSlidingComplete={this.finishSlider}
        />
      </View>
    );
  }
}
