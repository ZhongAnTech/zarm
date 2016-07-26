
import React, { Component, PropTypes } from 'react';
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

    let children = React.Children.map(props.children, (checkbox) => {
      return (
        <Checkbox {...checkbox.props}
          onChange={(e) => this.onCheckboxChange(e)}
          checked={!!(this.state.value.indexOf(checkbox.props.value) > -1)} />
      );
    });

    return (
      <div className="ui-checkbox-group">
        {children}
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

  onCheckboxChange(e) {
    let value = this.state.value,
        index = value.indexOf(e.target.value);

    if (index < 0) {
      value.push(e.target.value);
    } else {
      value.splice(index, 1);
    }

    this.setState({
      value: value
    });
    this.props.onChange(value);
  }
}

CheckboxGroup.propTypes = {
  onChange     : PropTypes.func,
};

CheckboxGroup.defaultProps = {
  onChange     : () => {},
};

export default CheckboxGroup;