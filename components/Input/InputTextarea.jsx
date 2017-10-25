import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Autosize from 'autosize';

class InputTextarea extends PureComponent {

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
    const length = e.target.value.length;
    this.setState({ length });
    typeof onChange === 'function' && onChange(e);
  }

  // 初始化自适应高度
  initAutosize = () => {
    const { autosize } = this.props;
    autosize && Autosize(this.input);
  }

  updateAutosize = (prevProps) => {
    if (prevProps.style !== this.props.style || prevProps.className !== this.props.className) {
      Autosize.update(this.input);
    }
  }

  // 销毁自适应高度
  destroyAutosize = () => {
    const { autosize } = this.props;
    autosize && Autosize.destroy(this.input);
  }

  render() {
    const {
      prefixCls,
      className,
      maxLength,
      disabled,
      autosize,
      showLength,
      ...others
    } = this.props;

    const cls = classnames(prefixCls, `${prefixCls}-textarea`, className, disabled);
    const textLengthRender = (showLength && maxLength) && <div className={`${prefixCls}-length`}>{`${this.state.length}/${maxLength}`}</div>;

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

InputTextarea.propTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  autosize: PropTypes.bool,
  maxLength: PropTypes.number,
  showLength: PropTypes.bool,
  onChange: PropTypes.func,
};

InputTextarea.defaultProps = {
  prefixCls: 'za-input',
  disabled: false,
  autosize: false,
  showLength: false,
};

export default InputTextarea;
