import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '../Cell';
import Icon from '../Icon';

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
    const { prefixCls, type, theme, value, isDisabled, className, children, onChange } = this.props;
    const { checked } = this.state;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      [`${prefixCls}`]: true,
      checked,
      disabled,
      [className]: !!className,
    });

    return type === 'cell'
      ? <Cell description={checked ? <Icon type="right" theme={theme} /> : null} onClick={() => !disabled && this._onClick()}>{children}</Cell>
      : (
          <span className={cls}>
            <input type="radio" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={() => !disabled && this._onClick()} />
            {children}
          </span>
        );
  }
}

Radio.propTypes = {
  prefixCls: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'info', 'success', 'warning', 'error']),
  type: PropTypes.oneOf(['default', 'cell']),
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  prefixCls: 'ui-radio',
  type: 'default',
  theme: 'info',
  defaultChecked: false,
  isDisabled: false,
  onChange: () => {},
};

export default Radio;
