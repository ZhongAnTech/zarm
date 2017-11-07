import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseInputNumberProps } from './PropsType';
import Events from '../utils/events';
import Keyboard from '../Keyboard';

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

  private picker;

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

  onClosePicker = (e) => {
    if (!this.picker || !this.state.visible) {
      return;
    }

    const pNode = ((node) => {
      while (node.parentNode && node.parentNode !== document.body) {
        if (node === this.picker) {
          return node;
        }
        node = node.parentNode;
      }
    })(e.target);

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
    const { prefixCls, className, type, disabled, defaultValue, ...others } = this.props;
    const { visible, value } = this.state;

    const cls = classnames(prefixCls, `${prefixCls}-number`, className, {
      disabled,
    });

    return (
      <div className={cls} ref={(ele) => { this.picker = ele; }}>
        <input
          {...others}
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
