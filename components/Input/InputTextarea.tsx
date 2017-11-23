import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseInputTextareaProps } from './PropsType';

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

function countSymbols(text = '') {
  return text.replace(regexAstralSymbols, '_').length;
}

export interface InputTextareaProps extends BaseInputTextareaProps {
  prefixCls?: string;
  className?: string;
}

export default class InputTextarea extends PureComponent<InputTextareaProps, any> {

  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
    autosize: false,
    showLength: false,
  };

  private input;

  constructor(props) {
    super(props);
    this.state = {
      length: (props.value || props.defaultValue || '').length,
    };
  }

  componentDidUpdate() {
    this.input.style.height = '';
    this.input.style.height = `${this.input.scrollHeight}px`;
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
      autosize,
      showLength,
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
        />
        {textLengthRender}
      </div>
    );
  }
}
