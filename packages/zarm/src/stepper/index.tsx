import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Minus as MinusIcon, Plus as PlusIcon } from '@zarm-design/icons';
import PropsType from './PropsType';
import Button from '../button';
import CustomInput from '../custom-input';
import type { CustomInputProps } from '../custom-input';
import Input from '../input';
import type { InputProps } from '../input';

const compareValue = (value, max, min) => {
  if (typeof max === 'number') {
    value = value > max ? max : value;
  }
  if (typeof min === 'number') {
    value = value < min ? min : value;
  }
  return value;
};

const getPrecision = (value) => {
  const valueStr = value?.toString();
  if (valueStr && valueStr.indexOf('e-') >= 0) {
    return parseInt(valueStr.slice(valueStr.indexOf('-e')), 10);
  }
  let precision = 0;
  if (valueStr && valueStr.indexOf('.') >= 0) {
    precision = valueStr.length - valueStr.indexOf('.') - 1;
  }
  return precision;
};

const getMaxPrecision = (currentValue, step) => {
  const stepPrecision = getPrecision(step);
  const currentValuePrecision = getPrecision(currentValue);
  return Math.max(currentValuePrecision, stepPrecision);
};

const getPrecisionFactor = (currentValue, step) => {
  const precision = getMaxPrecision(currentValue, step);
  return 10 ** precision;
};

const formatValue = (currentValue, step) => {
  const precision = getMaxPrecision(currentValue, step);
  // 小数当字符串处理，因为1.00在jstoFixed(2)返回的是字符串
  if (precision > 0) {
    return Number(currentValue).toFixed(precision);
  }
  return Number(Number(currentValue).toFixed(precision));
};

const getValue = (props: StepperProps, defaultValue: number) => {
  const { value, max, min, step } = props;
  let tempValue = props.defaultValue === undefined ? defaultValue : props.defaultValue;
  tempValue = value === undefined ? tempValue : value;
  return formatValue(compareValue(tempValue, max, min), step);
};

export interface StepperProps extends PropsType {
  prefixCls?: string;
  className?: string;
}

export interface StepperStates {
  value: number | string;
  prevPropsValue: number | string;
  lastValue: number | string;
}

export default class Stepper extends PureComponent<StepperProps, StepperStates> {
  static displayName = 'Stepper';

  static defaultProps: StepperProps = {
    prefixCls: 'za-stepper',
    shape: 'radius',
    disabled: false,
    step: 1,
    type: 'number',
    disableInput: false,
  };

  state: StepperStates = {
    value: getValue(this.props, 0),
    prevPropsValue: getValue(this.props, 0),
    lastValue: getValue(this.props, 0),
  };

  static getDerivedStateFromProps(nextProps: StepperProps, prevState: StepperStates) {
    if (typeof nextProps.value !== 'undefined' && nextProps.value !== prevState.prevPropsValue) {
      const value = getValue(nextProps, 0);

      return {
        value,
        lastValue: value,
        prevPropsValue: value,
      };
    }

    return null;
  }

  onInputChange = (value: string | number) => {
    const { onInputChange } = this.props;
    this.setState({ value });
    if (typeof onInputChange === 'function') {
      onInputChange(value);
    }
  };

  onInputBlur = (value: number | string) => {
    const { onChange, step, max, min } = this.props;
    let currentValue = value;
    if (Number.isNaN(Number(value))) {
      currentValue = this.state.lastValue;
    }
    currentValue = formatValue(compareValue(currentValue, max, min), step);
    this.setState({
      value: currentValue,
      lastValue: currentValue,
    });
    if (typeof onChange === 'function') {
      onChange(currentValue);
    }
  };

  onSubClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isSubDisabled()) {
      return;
    }
    const precisionFactor = getPrecisionFactor(value, step);
    const precision = getMaxPrecision(value, step);
    const newValue = (precisionFactor * Number(value) - precisionFactor * step!) / precisionFactor;
    this.onInputBlur(newValue.toFixed(precision));
  };

  onPlusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isPlusDisabled()) {
      return;
    }
    const precisionFactor = getPrecisionFactor(value, step);
    const precision = getMaxPrecision(value, step);
    const newValue = (precisionFactor * Number(value) + precisionFactor * step!) / precisionFactor;
    this.onInputBlur(newValue.toFixed(precision));
  };

  isSubDisabled = () => {
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

  render() {
    const { prefixCls, className, shape, disabled, size, type, disableInput } = this.props;
    const { value } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--disabled`]: disabled,
    });

    const inputCls = classnames(`${prefixCls}__input `, {
      [`${prefixCls}__input--disabled`]: disableInput,
    });

    const buttonSize = size === 'lg' ? 'sm' : 'xs';

    const inputProps = {
      className: inputCls,
      type,
      value,
      disabled: disabled || disableInput,
      clearable: false,
      onChange: () => !disabled && this.onInputChange(value),
      onBlur: () => !disabled && this.onInputBlur(value),
    };

    return (
      <span className={cls}>
        <Button
          className={`${prefixCls}__sub`}
          size={buttonSize}
          disabled={this.isSubDisabled()}
          shape={shape}
          onClick={this.onSubClick}
        >
          <MinusIcon />
        </Button>
        {['price'].indexOf(type!) > -1 ? (
          <CustomInput
            {...(inputProps as CustomInputProps)}
            onChange={(v) => !disabled && this.onInputChange(v!)}
          />
        ) : (
          <Input
            {...(inputProps as InputProps)}
            onChange={(e) => !disabled && this.onInputChange(e.target.value)}
          />
        )}
        <Button
          className={`${prefixCls}__plus`}
          size={buttonSize}
          disabled={this.isPlusDisabled()}
          shape={shape}
          onClick={this.onPlusClick}
        >
          <PlusIcon />
        </Button>
      </span>
    );
  }
}
