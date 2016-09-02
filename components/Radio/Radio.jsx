
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class Radio extends Component {

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
    const { type, value, checked, disabled, isDisabled, className, children, onChange, ...others } = props;
    const disabledFlag = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-radio'        : (type == 'default'),
      'ui-radio-button' : (type == 'button'),
      'checked'         : this.state.checked,
      'disabled'        : disabledFlag,
      [className]       : !!className,
    });

    return (
      <label {...others} className={cls}>
        <span className="ui-radio-input">
          <span className="ui-radio-inner"></span>
          <input
            type="radio"
            value={value}
            checked={this.state.checked}
            disabled={disabledFlag}
            onChange={(e) => this._onClick(e)} />
        </span>
        {children}
      </label>
    );
  }

  _onClick(e) {
    this.setState({
      checked: true
    });
    this.props.onChange(e);
  }
}

Radio.propTypes = {
  type          : PropTypes.oneOf(['default', 'button']),
  defaultChecked: PropTypes.bool,
  isDisabled    : PropTypes.bool,
  onChange      : PropTypes.func,
};

Radio.defaultProps = {
  type          : 'default',
  defaultChecked: false,
  isDisabled    : false,
  onChange      : () => {},
};

export default Radio;