import React from 'react';
import classnames from 'classnames';
import { Minus as MinusIcon, Plus as PlusIcon } from '@zarm-design/icons';
import type { BaseStepperProps } from './interface';
import Button from '../button';
import { ConfigContext } from '../n-config-provider';
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

export type StepperProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'value' | 'onChange'
> &
  BaseStepperProps;

const Stepper = React.forwardRef<unknown, StepperProps>((props, ref) => {
  const {
    className,
    shape,
    disabled,
    size,
    type,
    disableInput,
    step,
    max,
    min,
    value,
    defaultValue,
    onChange,
    onInputChange,
  } = props;

  const stepperRef = (ref as any) || React.createRef<HTMLElement>();

  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, min, max }, 0),
  );
  const [lastValue, setLastValue] = React.useState(
    getValue({ value, defaultValue, min, max, step }, 0),
  );

  const { prefixCls: globalPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-stepper`;

  const onInputChangeCallback = (newValue: string | number) => {
    setCurrentValue(newValue);
    if (typeof onInputChange === 'function') {
      onInputChange(newValue);
    }
  };

  const onInputBlur = (newValue: number | string) => {
    let newCurrentValue = newValue;
    if (Number.isNaN(Number(newValue))) {
      newCurrentValue = lastValue;
    }
    newCurrentValue = formatValue(compareValue(newCurrentValue, max, min), step);
    setCurrentValue(newCurrentValue);
    setLastValue(newCurrentValue);
    if (typeof onChange === 'function') {
      onChange(newCurrentValue);
    }
  };

  const isSubDisabled = () => {
    if (min === null) {
      return false;
    }
    return currentValue <= min! || disabled;
  };

  const isPlusDisabled = () => {
    if (max === null) {
      return false;
    }
    return currentValue >= max! || disabled;
  };

  const onSubClick = () => {
    if (isSubDisabled()) {
      return;
    }
    const precisionFactor = getPrecisionFactor(currentValue, step);
    const precision = getMaxPrecision(currentValue, step);
    const newValue =
      (precisionFactor * Number(currentValue) - precisionFactor * step!) / precisionFactor;
    onInputBlur(newValue.toFixed(precision));
  };

  const onPlusClick = () => {
    if (isPlusDisabled()) {
      return;
    }
    const precisionFactor = getPrecisionFactor(currentValue, step);
    const precision = getMaxPrecision(currentValue, step);
    const newValue =
      (precisionFactor * Number(currentValue) + precisionFactor * step!) / precisionFactor;
    onInputBlur(newValue.toFixed(precision));
  };

  React.useEffect(() => {
    const newValue = getValue({ value, defaultValue, min, max, step }, 0);
    setCurrentValue(newValue);
    setLastValue(newValue);
  }, [value, defaultValue, min, max, step]);

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
    value: currentValue,
    disabled: disabled || disableInput,
    clearable: false,
    onChange: () => !disabled && onInputChangeCallback(currentValue),
    onBlur: () => !disabled && onInputBlur(currentValue),
  };

  return (
    <span className={cls} ref={stepperRef}>
      <Button
        className={`${prefixCls}__sub`}
        size={buttonSize}
        disabled={isSubDisabled()}
        shape={shape}
        onClick={onSubClick}
      >
        <MinusIcon />
      </Button>
      {['price'].indexOf(type!) > -1 ? (
        <CustomInput
          {...(inputProps as CustomInputProps)}
          onChange={(v) => !disabled && onInputChangeCallback(v!)}
        />
      ) : (
        <Input
          {...(inputProps as InputProps)}
          onChange={(e) => !disabled && onInputChangeCallback(e.target.value)}
        />
      )}
      <Button
        className={`${prefixCls}__plus`}
        size={buttonSize}
        disabled={isPlusDisabled()}
        shape={shape}
        onClick={onPlusClick}
      >
        <PlusIcon />
      </Button>
    </span>
  );
});

Stepper.displayName = 'Stepper';
Stepper.defaultProps = {
  shape: 'radius',
  disabled: false,
  step: 1,
  type: 'number',
  disableInput: false,
};

export default Stepper;
