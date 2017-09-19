import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Drag from '../Drag';

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
      offset: 0,
    };
    this.offsetStart = 0;
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: getValue(nextProps, 0),
      });
    }
  }

  onDragMove(event, { offsetX }) {
    const { disabled } = this.props;
    if (disabled) return;

    event.preventDefault();

    let offset = this.offsetStart + offsetX;
    const maxOffset = this.slider.offsetWidth - this.handle.offsetWidth;
    offset = (offset < 0) ? 0 : offset;
    offset = (offset > maxOffset) ? maxOffset : offset;

    const { min, max, step } = this.props;
    const percent = offset / maxOffset;
    const value = Math.round(((max - min) * percent) / step) * step;
    offset = maxOffset * (value / (max - min));

    this.setState({ offset, value });
    return true;
  }

  onDragEnd(event, { offsetX }) {
    this.offsetStart += offsetX;

    const { onChange } = this.props;
    typeof onChange === 'function' && onChange();
  }

  render() {
    const { prefixCls, className, disabled, min, max } = this.props;
    const { value, offset } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      disabled,
    });

    const handleStyle = {
      left: offset,
    };

    const bgStyle = {
      width: offset,
    };

    return (
      <div className={cls} ref={(ele) => { this.slider = ele; }}>
        <div className={`${prefixCls}-line`}>
          <div className={`${prefixCls}-line-bg`} style={bgStyle} />
        </div>
        <Drag
          onDragMove={this.onDragMove}
          onDragEnd={this.onDragEnd}>
          <div
            className={`${prefixCls}-handle`}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            style={handleStyle}
            ref={(ele) => { this.handle = ele; }}
            />
        </Drag>
      </div>
    );
  }
}

Slider.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  prefixCls: 'za-slider',
  disabled: false,
  step: 1,
  min: 0,
  max: 100,
};

export default Slider;
