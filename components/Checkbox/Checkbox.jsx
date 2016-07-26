
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Checkbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked
      });
    }
  }

  render () {
    const props = this.props;
    const { value, isDisabled, className, children, onChange, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-checkbox': true,
      'checked'    : this.state.checked,
      'disabled'   : disabled,
      [className]  : !!className,
    });

    return (
      <label {...others}>
        <span className={cls}>
          <input
            className="ui-checkbox-input"
            type="checkbox"
            value={value}
            checked={this.state.checked}
            disabled={disabled}
            onChange={(e) => this._onClick(e)} />
          <span className="ui-checkbox-inner"></span>
        </span>
        {children}
      </label>
    );
  }

  _onClick(e) {
    const checked = this.state.checked;

    this.setState({
      checked: !checked
    });
    this.props.onChange(e);
  }
}

Checkbox.propTypes = {
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

Checkbox.defaultProps = {
  defaultChecked: false,
  isDisabled    : false,
  onChange      : () => {},
};

export default Checkbox;