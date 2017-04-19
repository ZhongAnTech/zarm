import React, { Component, PropTypes, cloneElement } from 'react';

import * as validateFuncs from './validate';

const typeValidateAttrs = {
  number: ['min', 'max', 'required', 'func'],
  bool: ['required', 'func'],
  string: ['minLength', 'maxLength', 'pattern', 'required', 'func'],
  all: ['min', 'max', 'minLength', 'maxLength', 'pattern', 'required', 'func'],
};

class ValidInput extends Component {

  constructor(props) {
    super(props);

    this.state = { value: props.value || this._getDefaultValue() };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this._initResult();
  }

  onChange(e) {
    const { onChange, setResult, name } = this.props;
    const value = this._getValue(e);
    const res = this._validate(value);

    onChange && onChange(value, res);
    setResult && setResult(value, res, name);
  }

  onBlur(e) {
    const { onBlur, setResult, name } = this.props;
    const value = this._getValue(e);

    if (!onBlur) {
      return null;
    }

    const res = this._validate(value);

    onBlur && onBlur(value, res);
    setResult && setResult(value, res, name);
  }

  _initResult() {
    const { initResult, name } = this.props;
    const { value = '' } = this.state;

    initResult && initResult(value, this._validate(value), name);
  }

  _getDefaultValue() {
    const { type } = this.props;

    if (type === 'number') {
      return 0;
    }

    if (type === 'bool') {
      return false;
    }

    if (type === 'string') {
      return '';
    }

    if (type === 'all') {
      return '';
    }

    return '';
  }

  _validate(value) {
    const { type = 'all', func } = this.props;
    const attrs = typeValidateAttrs[type] || [];

    for (let v = 0; v < attrs.length; v++) {
      const attr = attrs[v];
      const args = this.props[attr];
      const validateFunc = validateFuncs[attr](args);

      if (!validateFunc(value)) {
        return false;
      }
    }

    return true;
  }

  _getValue(e) {
    e = e.target || e;
    const value = e.value === undefined ? e : e.value;

    this.setState({ value });
    return value;
  }

  getChildren() {
    const { onChange, onBlur, props, state } = this;
    const { children } = props;
    const { value } = state;

    return React.Children.map(children, (child) => {
      return cloneElement(child, {
        onChange,
        onBlur,
        value,
      }, child.props.children);
    });
  }

  render() {
    return (
      <span>
        {this.getChildren()}
      </span>
    );
  }
}

ValidInput.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  required: PropTypes.bool,
  func: PropTypes.func,
  // pattern: 正则表达式

  onChange: PropTypes.func,
  onBlur: PropTypes.func,

  setResult: PropTypes.func, // 获取value和验证结果
  initResult: PropTypes.func, // 初始化value和验证结果
};

ValidInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
};

export default ValidInput;
