import React, { Component, PropTypes } from 'react';
import { arrayTreeFilter } from './utils';
import ColumnGroup from './ColumnGroup';

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
    const children = arrayTreeFilter(this.props.data, (item, level) => {
      return level <= index && item[this.props.valueMember] === value[level];
    });
    let data = children[index];
    let i;
    for (i = index + 1; data && data.children && data.children.length && i < this.props.cols; i += 1) {
      data = data.children[0];
      value[i] = data[this.props.valueMember];
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
    const childrenTree = arrayTreeFilter(data, (item, level) => {
      return item[this.props.valueMember] === value[level];
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
          value[i] = data[0][this.props.valueMember];
          data = data[0].children;
        }
      }
    }

    return value;
  }

  render() {
    const {
      prefixCls, pickerPrefixCls,
      className, displayMember,
      valueMember,
    } = this.props;

    return (
      <ColumnGroup
        prefixCls={prefixCls}
        pickerPrefixCls={pickerPrefixCls}
        className={className}
        displayMember={displayMember}
        valueMember={valueMember}
        selectedValue={this.state.value}
        onValueChange={(value, index) => this.onValueChange(value, index)} >
        {this.getCols()}
      </ColumnGroup>
    );
  }
}

Cascader.propTypes = {
  prefixCls: PropTypes.string,
  pickerPrefixCls: PropTypes.string,
};

Cascader.defaultProps = {
  cols: 3,
  prefixCls: '',
  pickerPrefixCls: '',
  data: [],
  disabled: false,
};

export default Cascader;
