import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Checkbox extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked || false,
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onValueChange() {
    const { disabled, onChange } = this.props;

    if (disabled) {
      return;
    }

    const checked = !this.state.checked;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render () {
    const props = this.props;
    const { prefixCls, className, value, disabled, children, onChange } = props;
    const { checked } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      checked,
      disabled,
    });

    return (
      <label className={cls}>
        <input type="radio" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
        <span className="ui-checkbox-inner"></span>
        {children}
      </label>
    );
  }
}

Checkbox.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  prefixCls: 'ui-checkbox',
  className: null,
  defaultChecked: false,
  disabled: false,
  onChange() {},
};

export default Checkbox;
