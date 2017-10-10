import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

function getValue(props, defaultValue) {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  return defaultValue;
}

class Stepper extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: getValue(props, 0),
      lastValue: getValue(props, 0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Number(getValue(nextProps, 0)),
        lastValue: Number(getValue(nextProps, 0)),
      });
    }
  }

  onInputChange = (value) => {
    value = Number(value);
    const { onInputChange } = this.props;
    this.setState({ value });
    typeof onInputChange === 'function' && onInputChange(value);
  }

  onInputBlur = (value) => {
    const { min, max, onChange } = this.props;
    value = Number(value);
    if (value === '' || isNaN(value)) {
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
    typeof onChange === 'function' && onChange(value);
  }

  onSubClick = () => {
    const { step } = this.props;
    const value = Number(this.state.value) - step;
    this.onInputBlur(value);
  }

  onPlusClick = () => {
    const { step } = this.props;
    const value = Number(this.state.value) + step;
    this.onInputBlur(value);
  }

  render() {
    const { prefixCls, className, theme, size, shape, disabled, min, max } = this.props;
    const { value } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      disabled,
    });

    const subDisabled = !!(typeof min === 'number' && value <= min) || disabled;
    const plusDisabled = !!(typeof max === 'number' && value >= max) || disabled;

    const subCls = classnames(`${prefixCls}-sub`, {
      disabled: subDisabled,
    });

    const plusCls = classnames(`${prefixCls}-plus`, {
      disabled: plusDisabled,
    });

    return (
      <span className={cls}>
        <span className={subCls} onClick={!subDisabled && this.onSubClick}><Icon type="minus" /></span>
        <input className={`${prefixCls}-body`} type="tel" value={value} onChange={e => this.onInputChange(e.target.value)} onBlur={e => this.onInputBlur(e.target.value)} />
        <span className={plusCls} onClick={!plusDisabled && this.onPlusClick}><Icon type="add" /></span>
      </span>
    );
  }
}

Stepper.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  shape: PropTypes.oneOf(['radius', 'circle']),
  value: PropTypes.number,  // eslint-disable-line
  defaultValue: PropTypes.number, // eslint-disable-line
  disabled: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
};

Stepper.defaultProps = {
  prefixCls: 'za-stepper',
  theme: 'primary',
  disabled: false,
  step: 1,
};

export default Stepper;
