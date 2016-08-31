
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from '../Icon';

class InputNumber extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: Number(nextProps.value)
      });
    }
  }

  render () { 
    const props = this.props;
    const { theme, isRadius, isDisabled, size, min, max, className, onChange, ...others } = props;
    const { value } = this.state;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    const cls = classnames({
      'ui-input-number' : true,
      'disabled'        : disabled,
      'radius'          : radius,
      [`theme-${theme}`]: !!theme,
      ['size-' + size]  : size,
      [className]       : !!className,
    });

    const subDisabled = !!(min && value <= min),
          plusDisabled = !!(max && value >= max)

    const subCls = classnames({
      'ui-input-number-sub' : true,
      'disabled'            : subDisabled
    });

    const plusCls = classnames({
      'ui-input-number-plus' : true,
      'disabled'             : plusDisabled
    });

    return (
      <span className={cls}>
        <span className={subCls} onClick={() => !subDisabled && this.onSubClick()}><Icon type="minus" /></span>
        <input {...others} className="ui-input-number-body" value={this.state.value} onChange={(e) => onChange(e.target.value)} />
        <span className={plusCls} onClick={() => !plusDisabled && this.onPlusClick()}><Icon type="add" /></span>
      </span>
    );
  }

  onSubClick() {
    const { step, onChange } = this.props,
          value = this.state.value - step;

    // this.setState({ value });
    !!onChange && onChange(value)
  }

  onPlusClick() {
    const { step, onChange } = this.props,
          value = this.state.value + step;
          
    // this.setState({ value });
    !!onChange && onChange(value)
  }
}

InputNumber.propTypes = {
  size         : PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isRadius     : PropTypes.bool,
  isDisabled   : PropTypes.bool,
  defaultValue : PropTypes.number,
  step         : PropTypes.number,
  min          : PropTypes.number,
  max          : PropTypes.number,
  className    : PropTypes.string,
};

InputNumber.defaultProps = {
  size        : null,
  isRadius    : false,
  isDisabled  : false,
  defaultValue: 0,
  step        : 1,
  min         : null,
  max         : null,
  className   : null,
};

export default InputNumber;