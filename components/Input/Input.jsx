import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Autosize from 'autosize';
import Events from '../utils/events';

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      length: 0,
    };
    this.setLength = this.setLength.bind(this);
  }

  componentDidMount() {
    this.initAutoHeight();
    Events.on(this.input, 'input', this.setLength);
  }

  componentWillUnmount() {
    this.destroyAutoHeight();
    Events.off(this.input, 'input', this.setLength);
  }

  // 设置长度
  setLength() {
    this.setState({
      length: this.input.value.length,
    });
  }

  // 初始化自适应高度
  initAutoHeight() {
    const { autoHeight } = this.props;
    autoHeight && Autosize(this.input);
  }

  // 销毁自适应高度
  destroyAutoHeight() {
    const { autoHeight } = this.props;
    autoHeight && Autosize.destroy(this.input);
  }

  render() {
    const {
      prefixCls,
      className,
      placeholder,
      type,
      defaultValue,
      maxLength,
      radius,
      disabled,
      autoHeight,
      showLength,
      ...others
    } = this.props;

    const cls = classnames({
      [`${prefixCls}`]: true,
      [className]: !!className,
      radius,
      disabled,
    });

    const inputRender = (type === 'textarea')
      ? (
        <textarea
          ref={(ele) => { this.input = ele; }}
          className={cls}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          {...others}>
          {defaultValue}
        </textarea>
      )
      : (
        <input
          ref={(ele) => { this.input = ele; }}
          type={type}
          className={cls}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          maxLength={maxLength}
          {...others}
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
  radius: PropTypes.bool,
  disabled: PropTypes.bool,
  autoHeight: PropTypes.bool,
  showLength: PropTypes.bool,
};

Input.defaultProps = {
  prefixCls: 'za-input',
  className: null,
  type: 'text',
  radius: false,
  disabled: false,
  autoHeight: false,
  showLength: false,
};

export default Input;
