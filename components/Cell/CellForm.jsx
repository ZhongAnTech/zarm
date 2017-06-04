import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';

class CellForm extends Component {
  constructor(props) {
    super(props);

    this.initing = true;
    this.state = {
      data: {},
    };

    this.setResult = this.setResult.bind(this);
  }

  onInit() {
    if (!this.initing) {
      return null;
    }

    let { total } = this.props;
    const { children, onInit } = this.props;
    const { data } = this.state;

    const keys = Object.keys(data);

    total = total === undefined ? children.length : total;

    if (keys.length < total) {
      return null;
    }

    this.initing = false;
    return onInit(this.getData());
  }

  onChange() {
    this.props.onChange(this.getData());
  }

  onBlur() {
    this.props.onBlur(this.getData());
  }

  setResult(value, validate, opts) {
    const { data = {} } = this.state;
    const { type = '', name = '' } = opts;
    const res = {
      value,
      validate,
    };

    data[name] = res;
    this.setState({ data }, () => {
      switch (type) {
        case 'init':
          this.onInit();
          break;
        case 'change':
          this.onChange();
          break;
        case 'blur':
          this.onBlur();
          break;
      }
    });
  }

  getData() {
    return {
      data: this._data(),
      validate: this._validate(),
    };
  }

  _data() {
    const { data } = this.state;

    const keys = Object.keys(data);

    return keys.reduce((res, key) => {
      res[key] = data[key].value;
      return res;
    }, {});
  }

  _validate() {
    const { data = {} } = this.state;
    const keys = Object.keys(data);

    const res = keys.some(key => !data[key].validate);
    return !res;
  }

  render() {
    const { className, onInit, onChange, onBlur, children, total, ...others } = this.props;

    const cls = classnames({
      'ui-cell-form': true,
      [className]: !!className,
    });

    const newChildren = React.Children.map(children, (child) => {
      const { props } = child;

      return cloneElement(child, {
        setResult: this.setResult,
        ...props,
      });
    });

    return (
      <span className={cls} {...others}>
        { newChildren }
      </span>
    );
  }
}

CellForm.propTypes = {
  onInit: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

CellForm.defaultProps = {
  onInit: () => {},
  onChange: () => {},
  onBlur: () => {},
};

export default CellForm;
