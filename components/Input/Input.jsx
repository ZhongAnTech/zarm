import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Autosize from 'autosize';

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      length: (props.value || props.defaultValue || '').length,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.initAutosize();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.style !== this.props.style ||
        prevProps.className !== this.props.className) {
      Autosize.update(this.input);
    }
  }

  componentWillUnmount() {
    this.destroyAutosize();
  }

  onInputChange(e) {
    const { onChange } = this.props;

    this.setState({
      length: e.target.value.length,
    });

    typeof onChange === 'function' && onChange(e);
  }

  // 初始化自适应高度
  initAutosize() {
    const { autosize } = this.props;
    autosize && Autosize(this.input);
  }

  // 销毁自适应高度
  destroyAutosize() {
    const { autosize } = this.props;
    autosize && Autosize.destroy(this.input);
  }

  render() {
    const {
      prefixCls,
      className,
      placeholder,
      type,
      maxLength,
      disabled,
      autosize,
      showLength,
      ...others
    } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      disabled,
    });

    const inputRender = (type === 'textarea')
      ? (
        <textarea
          {...others}
          ref={(ele) => { this.input = ele; }}
          className={cls}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={this.onInputChange}
          />
      )
      : (
        <input
          {...others}
          ref={(ele) => { this.input = ele; }}
          type={type}
          className={cls}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={this.onInputChange}
          />
      );

    const valueRender = (type === 'date')
      ? <div className={`${prefixCls}-placeholder`}>{placeholder}</div>
      : null;

    const textLengthRender = (showLength && maxLength)
      ? <div className={`${prefixCls}-length`}>{`${this.state.length}/${maxLength}`}</div>
      : null;

    return (
      <div className={cls}>
        {valueRender}
        {inputRender}
        {textLengthRender}
      </div>
    );
  }
}

Input.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  autosize: PropTypes.bool,
  showLength: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  prefixCls: 'za-input',
  className: null,
  type: 'text',
  disabled: false,
  rows: null,
  autosize: false,
  showLength: false,
  onChange() {},
};

export default Input;
