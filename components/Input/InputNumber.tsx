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
  private content;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: props.value || props.defaultValue || '',
    };
  }

  componentDidMount() {
    Events.on(document.body, 'click', this.onBlur);
  }

  componentWillUnmount() {
    Events.off(document.body, 'click', this.onBlur);
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

  onFocus = () => {
    document.activeElement.blur();
    this.open();
  }

  onBlur = (e) => {
    if (!this.input || !this.state.visible) {
      return;
    }

    const pNode = this.closest(e.target, '.za-keyboard');

    if (!pNode) {
      this.close();
    }
  }

  onKeyClick = (key) => {
    if (['close', 'ok'].indexOf(key) > -1) {
      this.close();
      return;
    }
    const value = this.state.value;
    const newValue = (key === 'delete')
      ? value.slice(0, value.length - 1)
      : value + key;

    if (newValue !== value) {
      const { onChange } = this.props;
      this.setState({ value: newValue }, () => this.scrollToEnd());

      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    }
  }

  scrollToStart = () => {
    this.content.scrollLeft = 0;
  }

  scrollToEnd = () => {
    this.content.scrollLeft = this.content.scrollWidth;
  }

  open = () => {
    this.setState({ visible: true }, () => this.scrollToEnd());
  }

  close = () => {
    this.setState({ visible: false }, () => this.scrollToStart());
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
        <div className={`${prefixCls}-content`} ref={(ele) => { this.content = ele; }}>{value}</div>
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
