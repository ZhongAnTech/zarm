import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arrayTreeFilter, formatToInit } from './utils';
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
    let i = index + 1;

    while (data && data.children && data.children.length) {
      if (this.props.cols && i >= this.props.cols) {
        break;
      }
      data = data.children[0];
      value[i] = data[this.props.valueMember];
      i += 1;
    }

    value.length = i;

    // for (i = index + 1; data && data.children && data.children.length && i < this.props.cols; i += 1) {
    //   data = data.children[0];
    //   value[i] = data[this.props.valueMember];
    // }
    // value.length = i;
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

    if (cols) {
      childrenTree.length = cols - 1;
    } else {
      childrenTree.length > 1 && childrenTree.splice(-1);
    }
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
    const data = d || this.props.data;
    const value = val || this.props.value || this.props.defaultValue;
    const valueMember = this.props.valueMember;

    if (!value || !value.length) {
      return formatToInit(data[0], valueMember, this.props.cols);
      // value = [];
      // for (let i = 0; i < this.props.cols; i += 1) {
      //   if (data && data.length) {
      //     value[i] = data[0][this.props.valueMember];
      //     data = data[0].children;
      //   }
      // }
    }

    return value;
  }

  render() {
    const {
      prefixCls, className,
      displayMember, valueMember,
    } = this.props;

    return (
      <ColumnGroup
        prefixCls={prefixCls}
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
};

Cascader.defaultProps = {
  prefixCls: 'za-picker',
  data: [],
  disabled: false,
};

export default Cascader;
