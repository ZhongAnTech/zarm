import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { InputBaseProps } from './PropsType';
import Icon from '../icon';

export default class InputBase extends PureComponent<InputBaseProps, any> {
  static defaultProps = {
    prefixCls: 'za-input',
    disabled: false,
    type: 'text',
    clearable: true,
    readOnly: false,
  };

  private input;

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      value: props.defaultValue || props.value || '',
    };
  }

  componentDidMount() {
    const { autoFocus } = this.props;
    const { focused } = this.state;

    if (autoFocus || focused) {
      this.input.focus();
    }
  }

  static getDerivedStateFromProps(props) {
    if ('value' in props) {
      return {
        value: props.value,
      };
    }
    return null;
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
    if (typeof onBlur === 'function') {
      onBlur(value);
    }
  };

  onChange = (e) => {
    const { onChange } = this.props;
    if (!this.state.focused) {
      this.setState({
        focused: true,
      });
    }
    this.setState({
      value: e.target.value,
    });
    if (onChange) {
      onChange(e.target.value);
    }
  };

  onClear = () => {
    const { isOnComposition } = this.state;
    const { onChange, onClear } = this.props;

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

    const { value } = this.state;
    const { focused } = this.state;
    const showClearIcon = clearable && ('value' in this.props) && ('onChange' in this.props);

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--focus`]: focused,
      [`${prefixCls}--clearable`]: showClearIcon,
      [`${prefixCls}--readonly`]: readOnly,
    });

    const valueProps: any = {};
    if ('value' in this.props) {
      valueProps.value = value;
    }

    const renderInput = (
      <input
        {...rest}
        {...valueProps}
        autoComplete="off"
        ref={(ele) => { this.input = ele; }}
        type={type}
        disabled={disabled}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onCompositionStart={(e) => { this.handleComposition(e); }}
        onCompositionUpdate={(e) => { this.handleComposition(e); }}
        onCompositionEnd={(e) => { this.handleComposition(e); }}
      />
    );

    const renderText = <div className={`${prefixCls}__content`}>{value}</div>;

    // clear icon
    const clearCls = classnames(`${prefixCls}__clear`, {
      [`${prefixCls}__clear--show`]: focused && value && value.length > 0,
    });
    const renderClearIcon = showClearIcon
      && <Icon type="wrong-round-fill" className={clearCls} onClick={() => { this.onClear(); }} />;

    return (
      <div className={cls}>
        {readOnly ? renderText : renderInput}
        {renderClearIcon}
      </div>
    );
  }
}
