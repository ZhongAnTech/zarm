import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { InputTextareaProps } from './PropsType';

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

const countSymbols = (text = '') => {
  return text.replace(regexAstralSymbols, '_').length;
};

export default class InputTextarea extends PureComponent<InputTextareaProps, any> {
  static defaultProps: InputTextareaProps = {
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
      value: props.value || props.defaultValue || '',
      focused: props.focused || false,
    };
  }

  componentDidMount() {
    const { autoFocus } = this.props;
    const { focused } = this.state;
    if (autoFocus || focused) {
      this.input.focus();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('focused' in nextProps || 'value' in nextProps) {
      return {
        value: nextProps.value || nextProps.defaultValue || '',
        focused: nextProps.focused || false,
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { autoHeight, rows, readOnly } = this.props;
    const { focused } = this.state;

    if (autoHeight) {
      this.input.style.height = 'auto';
      this.input.scrollTop = 0;
      this.input.style.height = `${this.input.scrollHeight}px`;
    }
    if (autoHeight && readOnly && rows) {
      this.input.style.height = `${this.input.scrollHeight * rows}px`;
    }
    if (focused) {
      this.input.focus();
    }
  }

  onFocus = (e) => {
    if (!('focused' in this.props)) {
      this.setState({
        focused: true,
      });
    }

    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e.target.value);
    }
  };

  onBlur = (e) => {
    if (!('focused' in this.props)) {
      this.setState({
        focused: false,
      });
    }
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      onBlur(e.target.value);
    }
  };

  handleComposition = (e) => {
    const { onCompositionStart, onCompositionUpdate, onCompositionEnd, onChange } = this.props;

    if (e.type === 'compositionstart') {
      // this.setState({
      //   isOnComposition: true,
      // });
      if (typeof onCompositionStart === 'function') {
        onCompositionStart(e);
      }
    }

    if (e.type === 'compositionupdate') {
      if (typeof onCompositionUpdate === 'function') {
        onCompositionUpdate(e);
      }
    }

    if (e.type === 'compositionend') {
      // composition is end
      // this.setState({
      //   isOnComposition: false,
      // });
      const { value } = e.target;
      if (typeof onCompositionEnd === 'function') {
        onCompositionEnd(e);
      }
      if (typeof onChange === 'function') {
        onChange(value);
      }
    }
  };

  onChange = (e) => {
    const { onChange } = this.props;
    const { value } = e.target;

    if (!('value' in this.props)) {
      this.setState({ value });
    }

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  render() {
    const {
      prefixCls,
      className,
      maxLength,
      disabled,
      readOnly,
      autoHeight,
      showLength,
      focused,
      ...rest
    } = this.props;

    const cls = classnames(prefixCls, `${prefixCls}--textarea`, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--readonly`]: readOnly,
    });

    const { value } = this.state;
    const length = countSymbols(value);

    const textLengthRender = showLength
      && maxLength
      && (
        <div className={`${prefixCls}__length`}>
          {`${length}/${maxLength}`}
        </div>
      );

    const renderInput = (
      <textarea
        {...rest}
        value={('value' in this.props) ? value : undefined}
        ref={(ele) => { this.input = ele; }}
        maxLength={maxLength}
        disabled={disabled}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onCompositionStart={(e) => { this.handleComposition(e); }}
        onCompositionUpdate={(e) => { this.handleComposition(e); }}
        onCompositionEnd={(e) => { this.handleComposition(e); }}
      />
    );

    const renderText = (
      <div className={`${prefixCls}__content`} ref={(ele) => { this.input = ele; }}>
        {value}
      </div>
    );

    return (
      <div className={cls}>
        {!readOnly ? renderInput : renderText}
        {textLengthRender}
      </div>
    );
  }
}
