import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { CloseCircleFill } from '@zarm-design/icons';
import { InputBaseProps } from './PropsType';
import { getValue } from './utils';

export default class InputBase extends PureComponent<InputBaseProps, any> {
  static defaultProps: InputBaseProps = {
    prefixCls: 'za-input',
    disabled: false,
    type: 'text',
    clearable: true,
    readOnly: false,
  };

  private input;

  private onBlurTimeout;

  private blurFromClear;

  constructor(props) {
    super(props);
    this.state = {
      focused: props.autoFocus || false,
      value: getValue(props),
    };
  }

  componentDidMount() {
    const { focused } = this.state;

    if (focused) {
      this.input.focus();
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: getValue(nextProps),
      };
    }
    return null;
  }

  componentWillUnmount() {
    if (this.onBlurTimeout) {
      clearTimeout(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }
  }

  onFocus = (e) => {
    this.setState({
      focused: true,
    });

    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      onFocus(e.target.value);
    }
  };

  onBlur = (e) => {
    const { onBlur } = this.props;
    const { value } = e.target;
    this.onBlurTimeout = setTimeout(() => {
      if (!this.blurFromClear && document.activeElement !== this.input) {
        this.setState({
          focused: false,
        });

        if (typeof onBlur === 'function') {
          onBlur(value);
        }
      }
      this.blurFromClear = false;
    }, 200);
  };

  onChange = (e) => {
    const { onChange } = this.props;
    const { focused } = this.state;
    const { value } = e.target;

    if (!focused) {
      this.setState({ focused: true });
    }

    if (!('value' in this.props)) {
      this.setState({ value });
    }

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  onClear = () => {
    const { isOnComposition } = this.state;
    const { onChange, onClear } = this.props;

    this.blurFromClear = true;
    this.setState({
      value: '',
    });

    !isOnComposition && this.focus();
    typeof onChange === 'function' && onChange('');
    typeof onClear === 'function' && onClear('');
  };

  handleComposition = (e) => {
    const { onCompositionStart, onCompositionUpdate, onCompositionEnd, onChange } = this.props;

    if (e.type === 'compositionstart') {
      this.setState({
        isOnComposition: true,
      });
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
      const { value } = e.target;
      // composition is end
      this.setState({
        isOnComposition: false,
      });
      if (typeof onCompositionEnd === 'function') {
        onCompositionEnd(e);
      }
      if (typeof onChange === 'function') {
        onChange(value);
      }
    }
  };

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  render() {
    const {
      prefixCls,
      className,
      disabled,
      clearable,
      readOnly,
      type,
      onClear,
      ...rest
    } = this.props;

    const { value, focused } = this.state;
    const showClearIcon = clearable && 'value' in this.props && 'onChange' in this.props;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--focus`]: focused && value && value.length > 0,
      [`${prefixCls}--clearable`]: showClearIcon,
      [`${prefixCls}--readonly`]: readOnly,
    });

    const renderInput = (
      <input
        {...rest}
        value={'value' in this.props ? value : undefined}
        autoComplete="off"
        ref={(ele) => {
          this.input = ele;
        }}
        type={type}
        disabled={disabled}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onCompositionStart={(e) => {
          this.handleComposition(e);
        }}
        onCompositionUpdate={(e) => {
          this.handleComposition(e);
        }}
        onCompositionEnd={(e) => {
          this.handleComposition(e);
        }}
      />
    );

    const renderText = <div className={`${prefixCls}__content`}>{value}</div>;

    // clear icon
    const renderClearIcon = showClearIcon && (
      <CloseCircleFill
        className={`${prefixCls}__clear`}
        onClick={() => {
          this.onClear();
        }}
      />
    );

    return (
      <div className={cls}>
        {readOnly ? renderText : renderInput}
        {renderClearIcon}
      </div>
    );
  }
}
