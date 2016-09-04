
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
    const { type, value, checked, isDisabled, className, children, onChange, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      'ui-radio'        : (type == 'default'),
      'ui-radio-button' : (type == 'button'),
      'checked'         : this.state.checked,
      'disabled'        : disabled,
      [className]       : !!className,
    });

    return (
      <label {...others} className={cls} onClick={() => !disabled && this._onClick()}>
        <span className="ui-radio-input">
          <span className="ui-radio-inner"></span>
        </span>
        {children}
      </label>
    );
  }

  _onClick(e) {
    const checked = true;
    this.setState({ checked });
    this.props.onChange(checked);
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