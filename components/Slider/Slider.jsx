import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Drag from '../Drag';
import Progress from '../Progress';

function getValue(props, defaultValue) {
  if ('value' in props) {
    return props.value;
  }
  if ('defaultValue' in props) {
    return props.defaultValue;
  }
  return defaultValue;
}

class Slider extends PureComponent {

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
        value: getValue(nextProps, 0),
      });
    }
  }

  render() {
    const { prefixCls, className, theme, size, shape, disabled, min, max } = this.props;
    const { value } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      disabled,
    });

    return (
      <div className={cls}>
        <Progress percent={0} />
        <div
          className={`${prefixCls}-handle`}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          />
      </div>
    );
  }
}

Slider.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  disabled: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  prefixCls: 'za-slider',
  theme: 'primary',
  disabled: false,
  step: 1,
  min: 0,
  max: 100,
};

export default Slider;
