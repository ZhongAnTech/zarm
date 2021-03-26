
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class InputNumber extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
      lastValue: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Number(nextProps.value),
        lastValue: Number(nextProps.value),
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
    if (min && value < min) {
      value = min;
    }
    if (max && value > max) {
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
    const value = this.state.value - step;
    this.onInputChange(value);
  }

  onPlusClick() {
    const { step } = this.props;
    const value = this.state.value + step;
    this.onInputChange(value);
  }

  render() {
    const props = this.props;
    const { theme, isRadius, isDisabled, size, min, max, className, onChange, ...others } = this.props;
    const { value } = this.state;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    const cls = classnames({
      'ui-input-number': true,
      disabled,
      radius,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [className]: !!className,
    });

    const subDisabled = !!(min && value <= min);
    const plusDisabled = !!(max && value >= max);

    const subCls = classnames({
      'ui-input-number-sub': true,
      disabled: subDisabled,
    });

    const plusCls = classnames({
      'ui-input-number-plus': true,
      disabled: plusDisabled,
    });

    return (
      <span className={cls}>
        <span className={subCls} onClick={() => !subDisabled && this.onSubClick()}><Icon type="minus" /></span>
        <input {...others} className="ui-input-number-body" value={value} onChange={e => this.onInputChange(e.target.value)} onBlur={e => this.onInputBlur(e.target.value)} />
        <span className={plusCls} onClick={() => !plusDisabled && this.onPlusClick()}><Icon type="add" /></span>
      </span>
    );
  }
}

InputNumber.propTypes = {
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isRadius: PropTypes.bool,
  isDisabled: PropTypes.bool,
  defaultValue: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
};

InputNumber.defaultProps = {
  size: null,
  isRadius: false,
  isDisabled: false,
  defaultValue: 0,
  step: 1,
  min: null,
  max: null,
  className: null,
};

export default InputNumber;
