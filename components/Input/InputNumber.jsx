import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Events from '../utils/events';
import Keyboard from '../Keyboard';

class InputNumber extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: props.value || '',
    };
  }

  componentDidMount() {
    Events.on(document.body, 'touchstart', this.onClosePicker);
  }

  componentWillUnmount() {
    Events.off(document.body, 'touchstart', this.onClosePicker);
  }

  onClosePicker = (e) => {
    if (!this.picker) return;
    if (!this.state.visible) return;

    const pNode = ((node) => {
      while (node.parentNode && node.parentNode !== document.body) {
        if (node === this.picker) {
          return node;
        }
        node = node.parentNode;
      }
    })(e.target);

    !pNode && this.close();
  }

  onFocus = () => {
    document.activeElement.blur();
    this.setState({ visible: true });
  }

  onKeyClick = (key) => {
    const value = this.state.value;
    const newValue = (key === 'delete')
      ? value.slice(0, value.length - 1)
      : value + key;

    this.setState({ value: newValue });
  }

  open = () => {
    this.setState({ visible: true });
  }

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    const { prefixCls, className, type, disabled, ...others } = this.props;
    const { visible, value } = this.state;

    const cls = classnames(prefixCls, `${prefixCls}-number`, className, disabled);

    return (
      <div className={cls} {...others} ref={(ele) => { this.picker = ele; }}>
        <input
          {...others}
          ref={(ele) => { this.input = ele; }}
          type="text"
          value={value}
          disabled={disabled}
          onFocus={this.onFocus}
          />
        <Keyboard.Picker
          type={type}
          visible={visible}
          onKeyClick={this.onKeyClick}
          />
      </div>
    );
  }
}

InputNumber.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
};

InputNumber.defaultProps = {
  prefixCls: 'za-input',
  disabled: false,
};

export default InputNumber;
