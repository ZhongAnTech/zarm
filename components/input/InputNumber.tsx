import React, { Component } from 'react';
import classnames from 'classnames';
import { InputNumberProps } from './PropsType';
import Events from '../utils/events';
import KeyboardPicker from '../keyboard-picker';
import Icon from '../icon';
import { getValue } from './utils';

export default class InputNumber extends Component<InputNumberProps, any> {
  static defaultProps: InputNumberProps = {
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
      value: getValue(props),
      visible: props.focused || false,
    };
  }

  componentDidMount() {
    const { autoFocus, focused } = this.props;

    if (autoFocus || focused) {
      this.onFocus();
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps && nextProps.value !== state.prevValue) {
      return {
        value: getValue(nextProps),
        prevValue: getValue(nextProps),
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { visible } = this.state;
    if (visible) {
      this.scrollToEnd();
    } else {
      this.scrollToStart();
    }
  }

  componentWillUnmount() {
    this.removeBlurListener();
  }

  onMaskClick = (e) => {
    const { visible } = this.state;
    const clsRegExp = new RegExp(`(^|\\s)${this.picker.props.prefixCls}(\\s|$)`, 'g');
    if (!visible) {
      return;
    }

    const cNode = ((node) => {
      while (node.parentNode && node.parentNode !== document.body) {
        if (node === this.picker || node === this.container || clsRegExp.test(node.className)) {
          return node;
        }
        node = node.parentNode;
      }
    })(e.target);

    if (!cNode) {
      this.onBlur();
    }
  };

  onKeyClick = (key) => {
    if (['close', 'ok'].indexOf(key) > -1) {
      this.onBlur();
      return;
    }

    const { value } = this.state;
    const newValue =
      key === 'delete' ? String(value).slice(0, String(value).length - 1) : value + key;

    if (!('value' in this.props)) {
      this.setState({ value: newValue });
    }

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  addBlurListener = () => {
    Events.on(document.body, 'click', this.onMaskClick);
  };

  removeBlurListener = () => {
    Events.off(document.body, 'click', this.onMaskClick);
  };

  onFocus = () => {
    const { disabled, readOnly, onFocus } = this.props;
    const { visible, value } = this.state;

    if (disabled || readOnly || visible) {
      return;
    }

    this.removeBlurListener();

    // 定位到文本尾部
    this.setState({ visible: true });

    if (typeof onFocus === 'function') {
      onFocus(value);
    }

    setTimeout(() => {
      this.addBlurListener();
    }, 50);
  };

  onBlur = () => {
    const { visible, value } = this.state;
    if (!visible) {
      return;
    }

    // 定位到文本首部
    this.setState({ visible: false });

    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur(value);
    }

    setTimeout(() => {
      this.removeBlurListener();
    }, 50);
  };

  onClear = () => {
    const { onChange, onClear } = this.props;
    this.setState(
      {
        value: '',
      },
      this.onFocus,
    );
    if (onClear) {
      onClear('');
    }
    if (typeof onChange === 'function') {
      onChange('');
    }
  };

  scrollToStart = () => {
    this.content.scrollLeft = 0;
  };

  scrollToEnd = () => {
    this.content.scrollLeft = this.content.scrollWidth;
  };

  focus = () => {
    this.onFocus();
  };

  blur = () => {
    this.onBlur();
  };

  render() {
    const { prefixCls, className, type, clearable, disabled, readOnly, placeholder } = this.props;
    const { visible, value } = this.state;
    const showClearIcon =
      clearable && 'value' in this.props && value.length > 0 && 'onChange' in this.props;

    const cls = classnames(prefixCls, `${prefixCls}--${type}`, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--focus`]: visible,
      [`${prefixCls}--clearable`]: showClearIcon,
      [`${prefixCls}--readonly`]: readOnly,
    });

    const renderInput = (
      <div className={`${prefixCls}__content`}>
        {(value === undefined || value === '') && !readOnly && (
          <div className={`${prefixCls}__placeholder`}>{placeholder}</div>
        )}
        <div
          className={`${prefixCls}__virtual-input`}
          ref={(ele) => {
            this.content = ele;
          }}
        >
          {value}
        </div>
        <input type="hidden" value={value} disabled={disabled} />
        <KeyboardPicker
          ref={(ele) => {
            this.picker = ele;
          }}
          visible={visible}
          type={type}
          onKeyClick={this.onKeyClick}
        />
      </div>
    );

    const renderText = <div className={`${prefixCls}__content`}>{value}</div>;

    const renderClearIcon = showClearIcon && (
      <Icon
        type="wrong-round-fill"
        className={`${prefixCls}__clear`}
        onClick={(e) => {
          e.stopPropagation();
          this.onClear();
        }}
      />
    );

    return (
      <div
        className={cls}
        onClick={this.onFocus}
        ref={(ele) => {
          this.container = ele;
        }}
      >
        {readOnly ? renderText : renderInput}
        {renderClearIcon}
      </div>
    );
  }
}
