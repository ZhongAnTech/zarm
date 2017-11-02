import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '../Cell';
import Button from '../Button';

function getChecked(props, defaultChecked) {
  if ('checked' in props && props.checked) {
    return props.checked;
  }
  if ('defaultChecked' in props && props.defaultChecked) {
    return props.defaultChecked;
  }
  return defaultChecked;
}

class Checkbox extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checked: getChecked(props, false),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onValueChange = () => {
    const { disabled, onChange } = this.props;
    if (disabled) return;

    const checked = !this.state.checked;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const { prefixCls, className, theme, shape, size, type, value, block, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
      [`size-${size}`]: !!size,
      checked,
      disabled,
    });

    const renderCheckbox = (
      <div className={cls}>
        <div className={`${prefixCls}-wrapper`}>
          <span className={`${prefixCls}-inner`} />
          {children && <span className={`${prefixCls}-text`}>{children}</span>}
          <input id={id} type="checkbox" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
        </div>
      </div>
    );

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} onClick={this.onValueChange}>
          {renderCheckbox}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <Button className={cls} theme={theme} shape={shape} size="xs" block={block} bordered={!checked} disabled={disabled}>
          <input type="checkbox" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Button>
      );
    }

    return renderCheckbox;
  }
}

Checkbox.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['lg']),
  type: PropTypes.oneOf(['button', 'cell']),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool, // eslint-disable-line
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  prefixCls: 'za-checkbox',
  theme: 'primary',
  disabled: false,
};

export default Checkbox;
