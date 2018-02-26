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

  private container;
  private content;

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || '',
      visible: props.focused || false,
    };
  }

  componentDidMount() {
    Events.on(document.body, 'click', this.onMaskClick);
    if (this.props.autoFocus || this.state.focused) {
      this.onFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('focused' in nextProps || 'autoFocus' in nextProps) {
      if (nextProps.focused || nextProps.autoFocus) {
        this.onFocus();
      } else {
        this.onBlur();
      }
    }
  }

  componentWillUnmount() {
    Events.off(document.body, 'click', this.onMaskClick);
  }

  onMaskClick = (e) => {
    if (!this.container || !this.state.visible) {
      return;
    }

    const pNode = ((node) => {
      while (node.parentNode && node.parentNode !== document.body) {
        if (node === this.container) {
          return node;
        }
        node = node.parentNode;
      }
    })(e.target);

    if (!pNode) {
      this.onBlur();
    }
  }

  onKeyClick = (key) => {
    if (['close', 'ok'].indexOf(key) > -1) {
      this.onBlur();
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

  onFocus = () => {
    if (this.state.visible) {
      return;
    }

    this.setState({ visible: true });
    this.scrollToEnd();
    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(this.state.value);
    }
  }

  onBlur = () => {
    if (!this.state.visible) {
      return;
    }

    this.setState({ visible: false });
    this.scrollToStart();
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur(this.state.value);
    }
  }

  render() {
    const { prefixCls, className, type, disabled, placeholder } = this.props;
    const { visible, value } = this.state;

    const cls = classnames(prefixCls, `${prefixCls}-number`, className, {
      disabled,
      focus: visible,
    });

    return (
      <div className={cls} ref={ele => { this.container = ele; }} onClick={this.onFocus}>
        {!value && <div className={`${prefixCls}-placeholder`}>{placeholder}</div>}
        <div className={`${prefixCls}-content`} ref={(ele) => { this.content = ele; }}>{value}</div>
        <input
          type="hidden"
          value={value}
          disabled={disabled}
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
