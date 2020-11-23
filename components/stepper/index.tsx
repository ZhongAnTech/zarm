import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Button from '../button';
import Icon from '../icon';
import Input from '../input';
import { InputNumberProps } from '../input/PropsType';

const getValue = (props: StepperProps, defaultValue: number) => {
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue;
  }
  return defaultValue;
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

  getPrecision = () => {
    const { step } = this.props;
    const stepStr = step?.toString();
    if (stepStr && stepStr.indexOf('e-') >= 0) {
      return parseInt(stepStr.slice(stepStr.indexOf('-e')), 10);
    }
    let precision = 0;
    if (stepStr && stepStr.indexOf('.') >= 0) {
      precision = stepStr.length - stepStr.indexOf('.') - 1;
    }
    return precision;
  };

  getPrecisionFactor = () => {
    const precision = this.getPrecision();
    return 10 ** precision;
  };

  fixedStep = (num) => {
    if (Number.isNaN(num) || num === '') {
      return num;
    }
    const precision = this.getPrecision();
    return Number(Number(num).toFixed(precision));
  };

  onInputChange = (value: string) => {
    // const _value = Number(value);
    const { onInputChange } = this.props;
    this.setState({ value });
    if (typeof onInputChange === 'function') {
      onInputChange(value);
    }
  };

  onInputBlur = (value: number | string) => {
    const { min, max, onChange } = this.props;
    value = Number(value);
    if (Number.isNaN(value)) {
      value = this.state.lastValue;
    }
    if (min !== null && value < min!) {
      value = min!;
    }
    if (max !== null && value > max!) {
      value = max!;
    }
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
    const precisionFactor = this.getPrecisionFactor();
    const newValue = (precisionFactor * Number(value) - precisionFactor * step!) / precisionFactor;
    this.onInputBlur(this.fixedStep(newValue));
  };

  onPlusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isPlusDisabled()) {
      return;
    }
    const precisionFactor = this.getPrecisionFactor();
    const newValue = (precisionFactor * Number(value) + precisionFactor * step!) / precisionFactor;
    this.onInputBlur(this.fixedStep(newValue));
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
      value,
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
