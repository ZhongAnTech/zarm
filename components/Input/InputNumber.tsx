import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseInputNumberProps } from './PropsType';
import Events from '../utils/events';
import KeyboardPicker from '../KeyboardPicker';

declare const document;

export interface InputNumberProps extends BaseInputNumberProps {
  prefixCls?: string;
  className?: string;
}

export default class InputNumber extends Component<InputNumberProps, any> {

  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
  };

  private input;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: props.value || props.defaultValue || '',
    };
  }

  componentDidMount() {
    Events.on(document.body, 'touchstart', this.onClosePicker);
  }

  componentWillUnmount() {
    Events.off(document.body, 'touchstart', this.onClosePicker);
  }

  closest = (el, selector) => {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return null;
  }

  onClosePicker = (e) => {
    if (!this.input || !this.state.visible) {
      return;
    }

    const pNode = this.closest(e.target, '.za-keyboard');

    if (!pNode) {
      this.close();
    }
  }

  onFocus = () => {
    document.activeElement.blur();
    this.open();
  }

  onKeyClick = (key) => {
    const value = this.state.value;
    const newValue = (key === 'delete')
      ? value.slice(0, value.length - 1)
      : value + key;

    if (newValue !== value) {
      const { onChange } = this.props;
      this.setState({ value: newValue });

      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    }
  }

  open = () => {
    this.setState({ visible: true });
  }

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    const { prefixCls, className, type, disabled, defaultValue, placeholder, ...others } = this.props;
    const { visible, value } = this.state;

    const cls = classnames(prefixCls, `${prefixCls}-number`, className, {
      disabled,
      focus: visible,
    });

    return (
      <div className={cls} ref={(ele) => { this.input = ele; }} onClick={this.onFocus}>
        {!value && <div className={`${prefixCls}-placeholder`}>{placeholder}</div>}
        <div className={`${prefixCls}-content`}>{value}</div>
        <input
          {...others}
          type="hidden"
          value={value}
          disabled={disabled}
          onFocus={this.onFocus}
        />
        <KeyboardPicker
          visible={visible}
          type={type}
          onKeyClick={this.onKeyClick}
        />
      </div>
    );
  }
}
