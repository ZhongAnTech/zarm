
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Input from '../Input';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || this.getCheckedValue(props.children)
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children)
      });
    }
  }
  
  render () {
    const props = this.props;
    const { placeholder, isDisabled, onChange, children, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    let valueText = <div className="ui-select-placeholder">{placeholder}</div>;
    React.Children.map(children, (option, index) => {
      if (this.state.value == option.props.value) {
        valueText = option.props.children;
        return;
      }
    });

    const cls = classnames({
      'ui-select': true,
      'disabled' : disabled,
    });

    return (
      <div className={cls}>
        {valueText}
        <select {...others} defaultValue={this.state.value} value={this.state.value} onChange={(e) => {
          const value = e.target.value;
          this.setState({ value });
          onChange(e)
        }}>
          {children}
        </select>
      </div>
    );
  }

  getCheckedValue(children) {
    let checkedValue = null;
    React.Children.forEach(children, (option) => {
      if (option.props && option.props.checked) {
        checkedValue = option.props.value;
      }
    });
    return checkedValue;
  }

}

Select.propTypes = { 
};

Select.defaultProps = {
};

export default Select;

