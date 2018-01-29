import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseInputTextareaProps } from './PropsType';

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

const countSymbols = (text = '') => {
  return text.replace(regexAstralSymbols, '_').length;
};

export interface InputTextareaProps extends BaseInputTextareaProps {
  prefixCls?: string;
  className?: string;
}

export default class InputTextarea extends PureComponent<InputTextareaProps, any> {

  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
    autoHeight: false,
    showLength: false,
    focused: false,
  };

  private input;

  constructor(props) {
    super(props);
    this.state = {
      length: (props.value || props.defaultValue || '').length,
      focused: props.focused || false,
    };
  }

  componentDidMount() {
    if (this.props.autoFocus || this.state.focused) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    const { autoHeight } = this.props;
    if (autoHeight) {
      this.input.style.height = '';
      this.input.style.height = `${this.input.scrollHeight}px`;
    }
    if (this.state.focused) {
      this.input.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('focused' in nextProps) {
      this.setState({
        focused: nextProps.focused,
      });
    }
  }

  onInputFocus = (e) => {
    if (!('focused' in this.props)) {
      this.setState({
        focused: true,
      });
    }

    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e.target.value);
    }
  }

  onInputBlur = (e) => {
    if (!('focused' in this.props)) {
      this.setState({
        focused: false,
      });
    }
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur(e.target.value);
    }
  }

  onInputChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.value;
    const length = countSymbols(value) + (value ? value.length : 0);
    this.setState({ length });
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }

  render() {
    const {
      prefixCls,
      className,
      maxLength,
      disabled,
      autoHeight,
      showLength,
      focused,
      ...others,
    } = this.props;

    const cls = classnames(prefixCls, `${prefixCls}-textarea`, className, {
      disabled,
    });

    const textLengthRender =
      showLength &&
      maxLength &&
      <div className={`${prefixCls}-length`}>
        {`${this.state.length}/${maxLength}`}
      </div>;

    return (
      <div className={cls}>
        <textarea
          {...others}
          ref={(ele) => { this.input = ele; }}
          disabled={disabled}
          maxLength={maxLength}
          onChange={this.onInputChange}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
        />
        {textLengthRender}
      </div>
    );
  }
}
