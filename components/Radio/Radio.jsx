import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Cell from '../Cell';
import Button from '../Button';
import Icon from '../Icon';

class Radio extends PureComponent {
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

    const checked = true;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const { prefixCls, className, type, theme, block, value, disabled, children } = this.props;
    const { checked } = this.state;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    if (type === 'cell') {
      return (
        <Cell disabled={disabled} description={checked ? <Icon type="right" theme={disabled ? null : theme} /> : null} onClick={() => {}}>
          <input type="radio" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Cell>
      );
    }

    return (
      <Button className={cls} theme={theme} size="xs" block={block} bordered={!checked} disabled={disabled}>
        <input type="radio" className={`${prefixCls}-input`} value={value} disabled={disabled} checked={checked} onChange={this.onValueChange} />
        {children}
      </Button>
    );
  }
}

Radio.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'cell']),
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  prefixCls: 'za-radio',
  className: null,
  type: null,
  defaultChecked: false,
  disabled: false,
  block: false,
  onChange() {},
};

export default Radio;
