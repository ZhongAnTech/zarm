import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

class InputNumber extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      lastValue: props.value,
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
    const value = Number(this.state.value) - step;
    this.onInputChange(value);
  }

  onPlusClick() {
    const { step } = this.props;
    const value = Number(this.state.value) + step;
    this.onInputChange(value);
  }

  render() {
    const props = this.props;
    const { prefixCls, className, theme, size, shape, isDisabled, min, max } = this.props;
    const { value } = this.state;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`size-${size}`]: !!size,
      [`shape-${shape}`]: !!shape,
      disabled,
    });

    const subDisabled = !!(min && value <= min) || disabled;
    const plusDisabled = !!(max && value >= max) || disabled;

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
        <input className={`${prefixCls}-body`} value={value} onChange={e => this.onInputChange(e.target.value)} onBlur={e => this.onInputBlur(e.target.value)} disabled={disabled} />
        <span className={plusCls} onClick={() => !plusDisabled && this.onPlusClick()}><Icon type="add" /></span>
      </span>
    );
  }
}

InputNumber.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  shape: PropTypes.oneOf(['radius', 'round', 'circle']),
  isDisabled: PropTypes.bool,
  value: PropTypes.number,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
};

InputNumber.defaultProps = {
  prefixCls: 'ui-input-number',
  className: null,
  theme: null,
  size: null,
  shape: null,
  isDisabled: false,
  value: 0,
  step: 1,
  min: null,
  max: null,
};

export default InputNumber;
