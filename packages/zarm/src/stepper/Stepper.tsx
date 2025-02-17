import { createBEM } from '@zarm-design/bem';
import { Minus as MinusIcon, Plus as PlusIcon } from '@zarm-design/icons';
import React from 'react';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import type { CustomInputProps } from '../custom-input';
import CustomInput from '../custom-input';
import type { InputProps } from '../input';
import Input from '../input';
import type { HTMLProps } from '../utils/utilityTypes';
import type { BaseStepperProps } from './interface';

export interface StepperCssVars {
  '--height'?: React.CSSProperties['height'];
  '--input-width'?: React.CSSProperties['width'];
  '--input-background'?: React.CSSProperties['background'];
  '--input-border-width'?: React.CSSProperties['borderWidth'];
  '--input-border-color'?: React.CSSProperties['borderColor'];
  '--input-border-radius'?: React.CSSProperties['borderRadius'];
  '--input-text-color'?: React.CSSProperties['color'];
  '--input-font-size'?: React.CSSProperties['fontSize'];
  '--input-disabled-text-color'?: React.CSSProperties['color'];
  '--input-disabled-opacity'?: React.CSSProperties['opacity'];
  '--input-margin'?: React.CSSProperties['margin'];
  '--input-padding'?: React.CSSProperties['padding'];
  '--icon-font-size'?: React.CSSProperties['fontSize'];
}

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

export type StepperProps = BaseStepperProps & HTMLProps<StepperCssVars>;

const Stepper = React.forwardRef<unknown, StepperProps>((props, ref) => {
  const {
    className,
    style,
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

  const stepperRef = (ref as any) || React.createRef<HTMLSpanElement>();

  const [currentValue, setCurrentValue] = React.useState(
    getValue({ value, defaultValue, min, max }, 0),
  );
  const [lastValue, setLastValue] = React.useState(
    getValue({ value, defaultValue, min, max, step }, 0),
  );

  const { prefixCls } = React.useContext(ConfigContext);
  const bem = createBEM('stepper', { prefixCls });

  const onInputChangeCallback = (newValue: string | number) => {
    setCurrentValue(newValue);
    onInputChange?.(newValue);
  };

  const onInputBlur = (newValue: number | string) => {
    let newCurrentValue = newValue;
    if (Number.isNaN(Number(newValue))) {
      newCurrentValue = lastValue;
    }
    newCurrentValue = formatValue(compareValue(newCurrentValue, max, min), step);
    setCurrentValue(newCurrentValue);
    setLastValue(newCurrentValue);
    onChange?.(newCurrentValue);
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

  const cls = bem([
    {
      [`${shape}`]: !!shape,
      [`${size}`]: !!size,
      disabled,
    },
    className,
  ]);

  const inputCls = bem('input', [
    {
      disabled: disableInput,
    },
  ]);

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
    <span ref={stepperRef} className={cls} style={style}>
      <Button
        className={bem('sub')}
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
        className={bem('plus')}
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
