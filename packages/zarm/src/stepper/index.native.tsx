import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import type { BaseStepperProps } from './interface';
import stepperStyle from './style/index.native';

const getValue = (props, defaultValue) => {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  return defaultValue;
};

export interface StepperProps extends BaseStepperProps {
  style?: CSSProperties;
  styles?: typeof stepperStyle;
}

const stepperStyles = StyleSheet.create<any>(stepperStyle);

export default class Stepper extends PureComponent<StepperProps, any> {
  static defaultProps = {
    disabled: false,
    step: 1,
    styles: stepperStyles,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, 0),
      lastValue: getValue(props, 0),
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== state.prevValue) {
      const value = getValue(nextProps, 0);
      return {
        value,
        lastValue: value,
        prevValue: value,
      };
    }
    return null;
  }

  onInputChange = (value) => {
    value = Number(value);
    const { onInputChange } = this.props;
    this.setState({ value });
    if (typeof onInputChange === 'function') {
      onInputChange(value);
    }
  };

  onInputBlur = (value) => {
    const { min, max, onChange } = this.props;
    value = Number(value);
    if (value === '' || Number.isNaN(value)) {
      value = this.state.lastValue;
    }
    if (min !== null && value < min!) {
      value = min;
    }
    if (max !== null && value > max!) {
      value = max;
    }
    this.setState({
      value,
      lastValue: value,
    });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  onMinusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isMinusDisabled()) {
      return;
    }

    const newValue = Number(value) - step!;
    this.onInputBlur(newValue);
  };

  onPlusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isPlusDisabled()) {
      return;
    }

    const newValue = Number(value) + step!;
    this.onInputBlur(newValue);
  };

  isMinusDisabled = () => {
    const { min, disabled } = this.props;
    const { value } = this.state;

    if (min === null) {
      return false;
    }
    return value <= min! || disabled;
  };

  isPlusDisabled = () => {
    const { max, disabled } = this.props;
    const { value } = this.state;

    if (max === null) {
      return false;
    }
    return value >= max! || disabled;
  };

  renderButton = (type) => {
    const { shape, styles } = this.props;
    const isDisabled = type === 'minus' ? this.isMinusDisabled() : this.isPlusDisabled();

    const buttonStyle = [
      styles!.button,
      styles![`${shape}Button`],
      isDisabled && styles!.disabledButton,
    ] as ViewStyle;

    const buttonTextStyle = [styles!.buttonText, isDisabled && styles!.disabledText] as ViewStyle;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={buttonStyle}
        disabled={isDisabled}
        onPress={type === 'minus' ? this.onMinusClick : this.onPlusClick}
      >
        <Text style={buttonTextStyle}>{type === 'minus' ? '-' : '+'}</Text>
      </TouchableOpacity>
    );
  };

  renderInput = () => {
    const { disabled, styles } = this.props;
    const inputStyle = [styles!.input, disabled && styles!.disabledText] as ViewStyle;

    return (
      <TextInput
        style={inputStyle}
        keyboardType="numeric"
        value={this.state.value.toString()}
        onChangeText={(value) => this.onInputChange(value)}
        onEndEditing={() => this.onInputBlur(this.state.value)}
        editable={!disabled}
        underlineColorAndroid="transparent"
        returnKeyType="done"
      />
    );
  };

  render() {
    const { styles, style } = this.props;
    const wrapperStyle = [styles!.container, style] as ViewStyle;

    return (
      <View style={wrapperStyle}>
        {this.renderButton('minus')}
        {this.renderInput()}
        {this.renderButton('plus')}
      </View>
    );
  }
}
