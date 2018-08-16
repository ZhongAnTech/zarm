import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { InputNumberProps } from './PropsType';
import Events from '../utils/events';
import KeyboardPicker from '../keyboard-picker';
import Icon from '../icon';

declare const document;

export default class InputNumber extends Component<InputNumberProps, any> {
  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
    clearable: true,
  };

  private content;
  private picker;
  private container;

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || '',
      visible: props.focused || false,
      focused: false,
    };
  }

  get showClearIcon() {
    return this.props.clearable && ('value' in this.props) && ('onChange' in this.props);
  }

  componentDidMount() {
    Events.on(document.body, 'click', this.onMaskClick);
    if (this.props.autoFocus || this.props.focused) {
      this.onFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    // if ('focused' in nextProps || 'autoFocus' in nextProps) {
    //   if (nextProps.focused || nextProps.autoFocus) {
    //     this.onFocus();
    //   } else {
    //     this.onBlur();
    //   }
    // }

    if ('value' in nextProps && value !== nextProps.value ) {
      this.setState({
        value: nextProps.value,
        visible: this.state.visible,
      });
    }
  }

  componentWillUnmount() {
    Events.off(document.body, 'click', this.onMaskClick);
  }

  onMaskClick = (e) => {
    const clsRegExp = new RegExp(`(^|\\s)${this.picker.props.prefixCls}(\\s|$)`, 'g');
    if (!this.state.visible || this.state.focused) {
      return;
    }

    const cNode = ((node) => {
      const picker = findDOMNode(this.picker) as HTMLElement;
      const container = findDOMNode(this.container) as HTMLElement;
      while (node.parentNode && node.parentNode !== document.body) {
        if (node === picker || node === container || clsRegExp.test(node.className)) {
          return node;
        }
        node = node.parentNode;
      }
    })(e.target);

    if (!cNode) {
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

  onClear() {
    const { onChange, onClear } = this.props;
    this.setState({
      value: '',
    }, this.onFocus);
    if (onClear) {
      onClear('');
    }
    if (typeof onChange === 'function') {
      onChange('');
    }
  }

  focus() {
    this.onFocus();
  }

  blur() {
    this.onBlur();
  }

  renderClear() {
    const { prefixCls } = this.props;
    const { visible, value } = this.state;

    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: !!(visible && value && value.length > 0),
    });
    return this.showClearIcon &&
      <Icon
        type="wrong-round-fill"
        className={clearCls}
        onClick={(e) => { e.stopPropagation(); this.onClear(); }}
      />;
  }

  render() {
    const { prefixCls, className, type, disabled, placeholder } = this.props;
    const { visible, value } = this.state;

    const cls = classnames(prefixCls, `${prefixCls}-number`, className, {
      disabled,
      focus: visible,
      clearable: this.showClearIcon,
    });

    return (
      <div className={cls} onClick={this.onFocus} ref={(ele) => { this.container = ele; }}>
        {!value && <div className={`${prefixCls}-placeholder`}>{placeholder}</div>}
        <div className={`${prefixCls}-content`} ref={(ele) => { this.content = ele; }}>{value}</div>
        <input
          type="hidden"
          value={value}
          disabled={disabled}
        />
        <KeyboardPicker
          ref={(ele) => { this.picker = ele; }}
          visible={visible}
          type={type}
          onKeyClick={this.onKeyClick}
        />
        {this.renderClear()}
      </div>
    );
  }
}
