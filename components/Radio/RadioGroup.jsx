
import React, { Component, PropTypes } from 'react';
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
    const { type, disabled, isBlock, isRadius, isDisabled, theme, size, className, children } = this.props

    let items = React.Children.map(children, (radio) => {
      return (
        <Radio {...radio.props}
          type={type}
          onChange={(e) => this.onRadioChange(e)}
          checked={this.state.value === radio.props.value}>
        </Radio>
      );
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

  onRadioChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onChange(e);
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