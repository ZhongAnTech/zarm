import React, { Component } from 'react';
import { arrayTreeFilter } from './array-tree-filter';
import MultiPicker from './MultiPicker';

class Cascader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.getValue(this.props.data, this.props.defaultValue || this.props.value),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: this.getValue(nextProps.data, nextProps.value),
      });
    }
  }

  onValueChange(value, index) {
    const children = arrayTreeFilter(this.props.data, (c, level) => {
      return level <= index && c.value === value[level];
    });
    let data = children[index];
    let i;
    for (i = index + 1; data && data.children && data.children.length && i < this.props.cols; i += 1) {
      data = data.children[0];
      value[i] = data.value;
    }
    value.length = i;

    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
  }

  getCols() {
    const { data, cols } = this.props;
    const value = this.state.value;
    const childrenTree = arrayTreeFilter(data, (c, level) => {
      return c.value === value[level];
    }).map(c => c.children);
    childrenTree.length = cols - 1;
    childrenTree.unshift(data);

    return childrenTree.map((children) => {
      return {
        props: {
          children: children || [],
        },
      };
    });
  }

  getValue(d, val) {
    let data = d || this.props.data;
    let value = val || this.props.value || this.props.defaultValue;
    if (!value || !value.length) {
      value = [];
      for (let i = 0; i < this.props.cols; i += 1) {
        if (data && data.length) {
          value[i] = data[0].value;
          data = data[0].children;
        }
      }
    }

    return value;
  }

  render() {
    const props = this.props;

    const {
      prefixCls, pickerPrefixCls,
      className, pickerItemStyle,
    } = props;

    return (
      <MultiPicker
        prefixCls={prefixCls}
        pickerPrefixCls={pickerPrefixCls}
        className={className}
        selectedValue={this.state.value}
        pickerItemStyle={pickerItemStyle}
        onValueChange={(value, index) => this.onValueChange(value, index)} >
        {this.getCols()}
      </MultiPicker>
    );
  }
}

// 判断类型要加
Cascader.defaultProps = {
  cols: 3,
  prefixCls: 'ui-multi-picker',
  pickerPrefixCls: 'ui-cascaderpicker',
  data: [],
  disabled: false,
};

export default Cascader;
