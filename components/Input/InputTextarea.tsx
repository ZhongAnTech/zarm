import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Autosize from 'autosize';
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

  componentDidMount() {
    this.initAutosize();
  }

  componentDidUpdate(prevProps) {
    this.updateAutosize(prevProps);
  }

  componentWillUnmount() {
    this.destroyAutosize();
  }

  onInputChange = (e) => {
    const { onChange } = this.props;
    const value = e.target.value;
    const length = countSymbols(value) + (value ? value.length : 0);
    this.setState({ length });
    if (typeof onChange === 'function') {
      onChange(e);
    }
  }

  // 初始化自适应高度
  initAutosize = () => {
    const { autosize } = this.props;
    if (autosize) {
      Autosize(this.input);
    }
  }

  updateAutosize = (prevProps) => {
    if (prevProps.style !== this.props.style || prevProps.className !== this.props.className) {
      Autosize.update(this.input);
    }
  }

  // 销毁自适应高度
  destroyAutosize = () => {
    const { autosize } = this.props;
    if (autosize) {
      Autosize.destroy(this.input);
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
