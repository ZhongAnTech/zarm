
import React, { Component } from 'react';
import classnames from 'classnames';

class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  render() {
    const props = this.props;
    const { placeholder, isDisabled, onChange, children, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    let valueText = <div className="ui-select-placeholder">{placeholder}</div>;
    React.Children.map(children, (option) => {
      // console.log(1, this.state.value, option.props.value)
      // use '==' is because option's value maybe string or number
      if (this.state.value !== '' && this.state.value == option.props.value) {
        valueText = option.props.children;
      }
    });

    const cls = classnames({
      'ui-select': true,
      disabled,
    });

    return (
      <div className={cls}>
        {valueText}
        <select
          {...others}
          value={this.state.value}
          onChange={(e) => {
            const value = e.target.value;
            this.setState({ value });
            typeof onChange === 'function' && onChange(e);
          }}>
          {children}
        </select>
      </div>
    );
  }

}

export default Select;

