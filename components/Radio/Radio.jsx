import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Radio extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  _onClick() {
    const checked = true;
    this.setState({ checked });
    this.props.onChange(checked);
  }

  render() {
    const props = this.props;
    const { prefixCls, type, value, checked, isDisabled, className, children, onChange, ...others } = this.props;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      [`${prefixCls}`]: (type === 'default'),
      [`${prefixCls}-button`]: (type === 'button'),
      checked: this.state.checked,
      disabled,
      [className]: !!className,
    });

    return (
      <span {...others} className={cls} onClick={() => !disabled && this._onClick()}>
        <span className="ui-radio-input">
          <span className="ui-radio-inner" />
        </span>
        {children}
      </span>
    );
  }
}

Radio.propTypes = {
  prefixCls: PropTypes.string,
  type: PropTypes.oneOf(['default', 'button']),
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  prefixCls: 'ui-radio',
  type: 'default',
  defaultChecked: false,
  isDisabled: false,
  onChange: () => {},
};

export default Radio;
