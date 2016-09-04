
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Radio from './Radio';

class RadioGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || this.getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children)
      });
    }
  }

  render() {    
    const props = this.props;
    const { type, disabled, isBlock, isRadius, isDisabled, theme, size, className, children } = props;

    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element, {
        key: index,
        type: type,
        onChange: () => this.onRadioChange(element.props.value),
        checked: (this.state.value === element.props.value)
      });
    });

    const cls = classnames({
      'ui-radio-group'   : true,
      'block'            : ('block' in props || isBlock),
      'radius'           : ('radius' in props || isRadius),
      'disabled'         : ('disabled' in props || isDisabled),
      [`theme-${theme}`] : !!theme,
      [`size-${size}`]   : !!size,
      [className]        : !!className,
    });

    return (
      <div className={cls}>
        {items}
      </div>
    );
  }

  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (radio) => {
      if (radio.props && radio.props.checked) {
        checkedValue = radio.props.value;
      }
    });
    return checkedValue;
  }

  onRadioChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }
}

RadioGroup.propTypes = {
  type    : PropTypes.oneOf(['default', 'button']),
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  type    : 'default',
  onChange: () => {},
};

export default RadioGroup;