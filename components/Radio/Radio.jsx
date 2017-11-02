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

class Radio extends PureComponent {

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

    const checked = true;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const { prefixCls, className, type, theme, shape, block, value, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames(`${prefixCls}`, className, {
      [`theme-${theme}`]: !!theme,
      [`shape-${shape}`]: !!shape,
      checked,
      disabled,
    });

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} description={checked ? <Icon type="right" theme={disabled ? null : theme} /> : null} onClick={() => {}}>
          <input type="radio" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <Button className={cls} theme={theme} shape={shape} size="xs" block={block} bordered={!checked} disabled={disabled}>
          <input type="radio" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Button>
      );
    }

    return (
      <div className={cls}>
        <div className={`${prefixCls}-wrapper`}>
          <span className={`${prefixCls}-inner`} />
          {children && <span className={`${prefixCls}-text`}>{children}</span>}
          <input id={id} type="radio" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
        </div>
      </div>
    );
  }
}

Radio.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'primary', 'info', 'success', 'warning', 'error']),
  type: PropTypes.oneOf(['button', 'cell']),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool, // eslint-disable-line
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  prefixCls: 'za-radio',
  theme: 'primary',
  disabled: false,
  block: false,
};

export default Radio;
