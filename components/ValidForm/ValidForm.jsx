import React, { Component, PropTypes, cloneElement } from 'react';

class ValidForm extends Component {
  constructor(props) {
    super(props);

    this.setResult = this.setResult.bind(this);
    this.initResult = this.initResult.bind(this);
  }

  onChange(result) {
    if (!this.props.onChange) {
      return null;
    }

    result = result || this._getResult();
    this.props.onChange(result.res, result.validate);
  }

  _getResult() {
    const { result } = this;
    const keys = Object.keys(result);

    const res = {};
    let validate = true;

    for (let v = 0; v < keys.length; v++) {
      const key = keys[v];

      res[key] = result[key].value;
      validate = result[key].validate ? validate : false;
    }

    return {
      res,
      validate,
    };
  }

  _callAfterSet() {
    const { onChange, onBlur } = this.props;

    if (!onChange && !onBlur) {
      return null;
    }

    const result = this._getResult();
    this.onChange(result);
  }

  setResult(value, validate, key) {
    this.result = this.result || {};
    this.result[key] = {
      value,
      validate,
    };

    this._callAfterSet();
  }

  // 初始表单的结果
  initResult(value, validate, key) {
    this.result = this.result || {};
    this.result[key] = {
      value,
      validate,
    };
  }

  // 子组件传入修改之后的回调
  getChildren() {
    const { setResult, initResult } = this;
    const { children } = this.props;

    return React.Children.map(children, (child, index) => {
      return cloneElement(child, {
        setResult,
        initResult,
        key: index,
      }, child.props.children);
    });
  }

  render() {
    return (
      <span>
        { this.getChildren() }
      </span>
    );
  }
}

ValidForm.propTypes = {
  onChange: PropTypes.func,
};

ValidForm.defaultProps = {
  onChange: () => {},
};

export default ValidForm;
