import React, { PureComponent, CSSProperties } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import PropsType from './PropsType';
import stepperStyle from './style/index.native';

export interface StepperProps extends PropsType {
  style?: CSSProperties;
  styles?: typeof stepperStyle;
}

const stepperStyles = StyleSheet.create<any>(stepperStyle);

export default class Stepper extends PureComponent<StepperProps, any> {
  static defaultProps = {
    theme: 'primary',
    disabled: false,
    step: 1,
    styles: stepperStyles,
  };

  renderButton = (type) => {
    const { theme, shape, disabled, styles } = this.props;

    const buttonStyle = [
      styles!.button,
      styles![`${theme}Button`],
      styles![`${shape}Button`],
      disabled && styles![`disabledButton`],
    ];

    const buttonTextStyle = [
      styles!.buttonText,
      styles![`${theme}ButtonText`],
      disabled && styles![`disabledButtonText`],
    ];

    return (
      <TouchableOpacity activeOpacity={0.6} style={buttonStyle} disabled={disabled}>
        <Text style={buttonTextStyle}>{type === 'minus' ? '-' : '+'}</Text>
      </TouchableOpacity>
    );
  }

  renderInput = () => {
    const { min, max, defaultValue, value, onChange, style, styles, ...others } = this.props;
    return <TextInput style={styles!.input} {...others} />;
  }

  render() {
    const { theme, shape, disabled, style, styles, ...others } = this.props;

    return (
      <View style={styles!.container} {...others}>
        {this.renderButton('minus')}
        {this.renderInput()}
        {this.renderButton('plus')}
      </View>
    );
  }
}
