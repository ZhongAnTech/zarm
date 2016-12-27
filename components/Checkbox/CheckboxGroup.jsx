
import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Checkbox from './Checkbox';

class CheckboxGroup extends Component {

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

  render () {
    const props = this.props;

    const items = React.Children.map(props.children, (element, index) => {
      return cloneElement(element, {
        key: index,
        onChange: () => this.onCheckboxChange(element.props.value),
        checked: !!(this.state.value.indexOf(element.props.value) > -1)
      });
    });

    return (
      <div className="ui-checkbox-group">
        {items}
      </div>
    );
  }

  getCheckedValue(children) {
    let checkedValue = [];
    React.Children.forEach(children, (checkbox) => {
      if (checkbox.props && checkbox.props.checked) {
        checkedValue.push(checkbox.props.value);
      }
    });
    return checkedValue;
  }

  onCheckboxChange(value) {
    let values = this.state.value,
        index = values.indexOf(value);

    if (index < 0) {
      values.push(value);
    } else {
      values.splice(index, 1);
    }

    this.setState({
      value: values
    });
    this.props.onChange(values);
  }
}

CheckboxGroup.propTypes = {
  onChange     : PropTypes.func,
};

CheckboxGroup.defaultProps = {
  onChange     : () => {},
};

export default CheckboxGroup;
