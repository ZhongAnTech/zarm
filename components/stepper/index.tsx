import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Button from '../button';
import Icon from '../icon';
import Input from '../input';
import { InputNumberProps } from '../input/PropsType';

const compareValue = (value, max, min) => {
  if (typeof max === 'number') {
    value = value > max ? max : value;
  }
  if (typeof min === 'number') {
    value = value < min ? min : value;
  }
  return value;
};

const getValue = (props: StepperProps, defaultValue: number) => {
  const { value, max, min } = props;
  let tempValue = props.defaultValue === undefined ? defaultValue : props.defaultValue;
  tempValue = value === undefined ? tempValue : value;
  return compareValue(tempValue, max, min);
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
    type: 'text',
    disableInput: false,
  };

  state: StepperStates = {
    value: getValue(this.props, 0),
    prevPropsValue: getValue(this.props, 0),
    lastValue: getValue(this.props, 0),
  };

  static getDerivedStateFromProps(nextProps: StepperProps, prevState: StepperStates) {
    if (
      typeof nextProps.value !== 'undefined'
      && nextProps.value !== prevState.prevPropsValue
    ) {
      const value = Number(getValue(nextProps, 0));

      return {
        value,
        lastValue: value,
        prevPropsValue: value,
      };
    }

    return null;
  }

  getInputValue = (value) => {
    let currentValue = value;
    const { max, min } = this.props;
    currentValue = compareValue(value, max, min);
    const precision = this.getMaxPrecision(value);
    // 小数当字符串处理，因为1.00在jstoFixed(2)返回的是字符串
    if (precision > 0) {
      return Number(currentValue).toFixed(precision);
    }
    return Number(Number(currentValue).toFixed(precision));
  };

  getPrecision = (value) => {
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

  getMaxPrecision(currentValue) {
    const { step } = this.props;
    const stepPrecision = this.getPrecision(step);
    const currentValuePrecision = this.getPrecision(currentValue);
    return Math.max(currentValuePrecision, stepPrecision);
  }

  getPrecisionFactor = (currentValue) => {
    const precision = this.getMaxPrecision(currentValue);
    return 10 ** precision;
  };

  onInputChange = (value: string | number) => {
    const _value = Number(value);
    const { onInputChange } = this.props;
    this.setState({ value: _value });
    if (typeof onInputChange === 'function') {
      onInputChange(_value);
    }
  };

  onInputBlur = (value: number | string) => {
    const { min, max, onChange } = this.props;
    value = Number(value);
    if (Number.isNaN(value)) {
      value = this.state.lastValue;
    }
    value = compareValue(value, max, min);
    this.setState({
      value,
      lastValue: value,
    });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  onSubClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isSubDisabled()) {
      return;
    }
    const precisionFactor = this.getPrecisionFactor(value);
    const precision = this.getMaxPrecision(value);
    const newValue = (precisionFactor * Number(value) - precisionFactor * step!) / precisionFactor;
    this.onInputBlur(newValue.toFixed(precision));
  };

  onPlusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isPlusDisabled()) {
      return;
    }
    const precisionFactor = this.getPrecisionFactor(value);
    const precision = this.getMaxPrecision(value);
    const newValue = (precisionFactor * Number(value) + precisionFactor * step!) / precisionFactor;
    this.onInputBlur(newValue.toFixed(precision));
  };

  isSubDisabled = () => {
    const { min, disabled } = this.props;
    const { value } = this.state;

    if (min === null) {
      return false;
    }
    return (value <= min!) || disabled;
  };

  isPlusDisabled = () => {
    const { max, disabled } = this.props;
    const { value } = this.state;

    if (max === null) {
      return false;
    }
    return (value >= max!) || disabled;
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

    const buttonSize = (size === 'lg') ? 'sm' : 'xs';

    const inputProps = {
      className: inputCls,
      type,
      value: this.getInputValue(value),
      disabled: disabled || disableInput,
      onChange: (v) => !disabled && this.onInputChange(v!),
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
          <Icon type="minus" />
        </Button>
        <Input
          {...inputProps as InputNumberProps}
        />
        <Button
          className={`${prefixCls}__plus`}
          size={buttonSize}
          disabled={this.isPlusDisabled()}
          shape={shape}
          onClick={this.onPlusClick}
        >
          <Icon type="add" />
        </Button>
      </span>
    );
  }
}
