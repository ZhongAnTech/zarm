import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { InputTextareaProps } from './PropsType';

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

const countSymbols = (text = '') => {
  return text.replace(regexAstralSymbols, '_').length;
};

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
    const { autoFocus } = this.props;
    const { focused } = this.state;
    if (autoFocus || focused) {
      this.input.focus();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('focused' in nextProps) {
      return {
        focused: nextProps.focused,
      };
    }
    return null;
  }

  componentDidUpdate() {
    const { autoHeight } = this.props;
    const { focused } = this.state;

    if (autoHeight) {
      this.input.style.height = `${this.input.scrollHeight}px`;
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
    const length = countSymbols(value);
    this.setState({ length });
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
      type,
      ...rest
    } = this.props;
    const { length } = this.state;
    const cls = classnames(prefixCls, `${prefixCls}--textarea`, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--readonly`]: readOnly,
    });

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
      <div className={`${prefixCls}__content`}>
        {rest.value || rest.defaultValue}
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
