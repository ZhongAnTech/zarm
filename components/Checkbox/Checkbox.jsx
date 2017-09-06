import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '../Cell';
import Button from '../Button';
import Icon from '../Icon';

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

    if (disabled) return;

    const checked = !this.state.checked;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const { prefixCls, className, theme, shape, size, type, value, block, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
      [`size-${size}`]: !!size,
      checked,
      disabled,
    });

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} description={checked && <Icon type="right" theme={!disabled && theme} />} onClick={() => {}}>
          <input type="checkbox" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
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

    return (
      <div className={cls}>
        <div className={`${prefixCls}-wrapper`}>
          <span className={`${prefixCls}-inner`}>
            <Icon type="right" theme={theme} />
          </span>
          { children && <span className={`${prefixCls}-text`}>{children}</span> }
          <input id={id} type="checkbox" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
        </div>
      </div>
    );
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
