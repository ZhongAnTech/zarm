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
      checked: props.checked || props.defaultChecked,
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
    const { isDisabled, onChange } = this.props;
    const disabled = 'disabled' in this.props || isDisabled;

    if (disabled) {
      return;
    }

    const checked = true;
    this.setState({ checked });
    typeof onChange === 'function' && onChange(checked);
  }

  render() {
    const props = this.props;
    const { prefixCls, type, theme, isBlock, isDisabled, className, children } = this.props;
    const { checked } = this.state;
    const disabled = 'disabled' in props || isDisabled;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
    });

    if (type === 'cell') {
      return (
        <Cell isDisabled={disabled} description={checked ? <Icon type="right" theme={disabled ? null : theme} /> : null} onClick={() => {}}>
          <input type="radio" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
          {children}
        </Cell>
      );
    }

    return (
      <Button className={cls} theme={theme} size="xs" isBlock={isBlock} isBordered={!checked} isDisabled={disabled}>
        <input type="radio" className={`${prefixCls}-input`} disabled={disabled} checked={checked} onChange={this.onValueChange} />
        {children}
      </Button>
    );
  }
}

Radio.propTypes = {
  prefixCls: PropTypes.string,
  theme: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  type: PropTypes.oneOf(['button', 'cell']),
  defaultChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  prefixCls: 'ui-radio',
  theme: null,
  type: null,
  defaultChecked: false,
  isDisabled: false,
  onChange: () => {},
};

export default Radio;
