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

  onInputChange(value) {
    const { onChange } = this.props;
    this.setState({
      value,
    });
    typeof onChange === 'function' && onChange(value);
  }

  onInputBlur(value) {
    const { min, max, onBlur } = this.props;
    if (value === '' || isNaN(value)) {
      value = this.state.lastValue;
    }
    if (typeof min === 'number' && value < min) {
      value = min;
    }
    if (typeof max === 'number' && value > max) {
      value = max;
    }
    this.setState({
      value,
      lastValue: value,
    });
    typeof onBlur === 'function' && onBlur(value);
  }

  onSubClick() {
    const { step } = this.props;
    const value = Number(this.state.value) - step;
    this.onInputChange(value);
  }

  onPlusClick() {
    const { step } = this.props;
    const value = Number(this.state.value) + step;
    this.onInputChange(value);
  }

  render() {
    const { prefixCls, className, theme, size, shape, disabled, min, max } = this.props;
    const { value } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      disabled,
    });

    const subDisabled = !!(typeof min === 'number' && value <= min) || disabled;
    const plusDisabled = !!(typeof max === 'number' && value >= max) || disabled;

    const subCls = classnames({
      [`${prefixCls}-sub`]: true,
      disabled: subDisabled,
    });

    const plusCls = classnames({
      [`${prefixCls}-plus`]: true,
      disabled: plusDisabled,
    });

    return (
      <span className={cls}>
        <span className={subCls} onClick={() => !subDisabled && this.onSubClick()}><Icon type="minus" /></span>
        <input className={`${prefixCls}-body`} type="tel" value={value} onChange={e => this.onInputChange(e.target.value)} onBlur={e => this.onInputBlur(e.target.value)} disabled={disabled} />
        <span className={plusCls} onClick={() => !plusDisabled && this.onPlusClick()}><Icon type="add" /></span>
      </span>
    );
  }
}

Stepper.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  shape: PropTypes.oneOf(['radius', 'round', 'circle']),
  disabled: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

Stepper.defaultProps = {
  prefixCls: 'zax-stepper',
  className: null,
  theme: 'primary',
  size: null,
  shape: null,
  disabled: false,
  step: 1,
  min: null,
  max: null,
};

export default Stepper;
