import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Icon } from '../../components';

// 清除输入内容
class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      showClearBtn: false,
      counter: 0,
    };
  }

  getInput(props) {
    const { placeholder, type, isRadius, isDisabled, size, defaultValue, className, ...others } = props;
    const disabled = 'disabled' in props || isDisabled;
    const radius = 'radius' in props || isRadius;

    const cls = this.cls = classnames({
      'ui-input': true,
      disabled,
      radius,
      [`size-${size}`]: size,
      [className]: !!className,
    });

        // 只有text类型下才出现Icon
        // 使用onMouseDown处理 click点击之前就失去焦点的问题
    this.clearBtn = type === 'text'
            ? (<Icon
              className="clear-input-btn"
              type="wrong-round-fill"
              onMouseDown={e => this.clearInputText(e)}
              onTouchStart={e => this.clearInputText(e)}
              theme="error"
              />)
            : null;

        // valueText?
    const valueText = (type === 'date') ? <div className="ui-input-placeholder">{placeholder}</div> : null;

        // 计算需不需要添加paddingRight;
    const inputRightPading = this.state.showClearBtn ? ' show-btn' : '';

    const input = (type === 'textarea')
            ? (<textarea
              {...others}
              className={cls}
              placeholder={placeholder}
              disabled={disabled}>{defaultValue}
            </textarea>)
            : (<input
              {...others}
              type={type}
              className={cls + inputRightPading}
              placeholder={placeholder}
              defaultValue={defaultValue}
              value={this.state.value}
              disabled={disabled}
              onFocus={e => this.handleFocus(e)}
              onBlur={e => this.handleBlur(e)}
              onChange={e => this.handleChange(e)}
              />);

    return {
      input,
      valueText,
    };
  }

    // 获取焦点
  handleFocus(e) {
    if (this.state.value !== '') {
      this.setState({
        showClearBtn: true,
      });
    }

        // 处理外部props的事件
    if (this.props.onFocus) {
      this.props.onFocus.apply(this, arguments);
    }
  }

    // 失去焦点
  handleBlur(e) {
    this.setState({
      showClearBtn: false,
    });

        // 处理外部props的事件
    typeof this.props.onBlur === 'function' && this.props.onBlur.apply(this, arguments);
  }


    // 处理输入事件
  handleChange(e) {
    const { value } = e.currentTarget;
    const stateTemp = {
      value,
    };
    if (value === '') {
      stateTemp.showClearBtn = false;
    } else if (this.state.showClearBtn !== true) {
      stateTemp.showClearBtn = true;
    }

    this.setState(stateTemp);

        // 处理外部事件
    typeof this.props.onChange === 'function' && this.props.onChange.apply(this, arguments);
  }

    // 清除输入内容
  clearInputText(e) {
    e.preventDefault();
    this.setState({
      value: '',
      showClearBtn: false,
    });
  }

  render() {
    const { input, valueText } = this.getInput(this.props);
    return (
      <span className={`${this.cls} ui-input-box`}>
        {valueText}
        {input}
        {this.state.showClearBtn ? this.clearBtn : null}
      </span>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['xl', 'lg', 'sm', 'xs']),
  isRadius: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  size: null,
  isRadius: false,
  isDisabled: false,
  className: null,
  defaultValue: '',
};

export default Input;
