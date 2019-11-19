import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import Button from '../button';
import Icon from '../icon';

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
  value: number;
  prevPropsValue: number;
  lastValue: number;
}

export default class Stepper extends PureComponent<StepperProps, StepperStates> {
  static displayName = 'Stepper';

  static defaultProps = {
    prefixCls: 'za-stepper',
    shape: 'radius',
    disabled: false,
    step: 1,
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

  onInputChange = (value: string) => {
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
    if (min !== null && value < min) {
      value = min;
    }
    if (max !== null && value > max) {
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

  onSubClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isSubDisabled()) {
      return;
    }

    const newValue = Number(value) - step;
    this.onInputBlur(newValue);
  };

  onPlusClick = () => {
    const { step } = this.props;
    const { value } = this.state;
    if (this.isPlusDisabled()) {
      return;
    }

    const newValue = Number(value) + step;
    this.onInputBlur(newValue);
  };

  isSubDisabled = () => {
    const { min, disabled } = this.props;
    const { value } = this.state;

    if (min === null) {
      return false;
    }
    return (value <= min) || disabled;
  };

  isPlusDisabled = () => {
    const { max, disabled } = this.props;
    const { value } = this.state;

    if (max === null) {
      return false;
    }
    return (value >= max) || disabled;
  };

  render() {
    const { prefixCls, className, shape, disabled, size } = this.props;
    const { value } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--${shape}`]: !!shape,
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--disabled`]: disabled,
    });

    const buttonSize = (size === 'lg') ? 'sm' : 'xs';

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
        <input
          className={`${prefixCls}__input`}
          type="tel"
          value={value}
          disabled={disabled}
          onChange={(e) => !disabled && this.onInputChange(e.target.value)}
          onBlur={() => !disabled && this.onInputBlur(value)}
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
