import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '../Cell';
import Button from '../Button';
import Icon from '../Icon';

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
        checked: nextProps.checked || nextProps.defaultChecked || false,
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

  render() {
    const { prefixCls, className, theme, type, value, block, disabled, id, children } = this.props;
    const { checked } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      checked,
      disabled,
    });

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} description={checked ? <Icon type="right" theme={disabled ? null : theme} /> : null} onClick={() => {}}>
          <input type="checkbox" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Cell>
      );
    }

    if (type === 'button') {
      return (
        <Button className={cls} theme={theme} size="xs" block={block} bordered={!checked} disabled={disabled}>
          <input type="checkbox" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Button>
      );
    }

    return (
      <div className={cls}>
        <div className={`${prefixCls}-wrapper`}>
          <span className={`${prefixCls}-inner`} />
          {
            children
              ? <span className={`${prefixCls}-text`}>{children}</span>
              : null
          }
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
  type: PropTypes.oneOf(['button', 'cell']),
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  prefixCls: 'za-checkbox',
  className: null,
  theme: 'primary',
  type: null,
  defaultChecked: false,
  disabled: false,
  onChange() {},
};

export default Checkbox;
