import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseSelectProps } from './PropsType';
import { arrayTreeFilter, initDataAndValue, updateDataSource, updateValue } from '../Picker/utils';
import Picker from '../Picker';

export interface SelectProps extends BaseSelectProps {
  prefixCls?: string;
  className?: string;
}

export default class InputSelect extends Component<SelectProps, any> {

  static defaultProps = {
    prefixCls: 'za-select',
    onMaskClick: () => {},
    itemRender: data => data.label,
    valueMember: 'value',
  };

  constructor(props) {
    super(props);

    const initValue = props.value || props.defaultValue || [];
    let { data , value, cascade } = initDataAndValue(props.dataSource, initValue);

    this.state = {
      visible: props.visible || false,
      value,
      data,
      cascade,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
      const { dataSource } = nextProps;
      let { data, cascade } = updateDataSource(dataSource);

      this.setState({
        data,
        cascade,
      });
    }

    if ('value' in nextProps && nextProps.value !== this.props.value) {
      const { dataSource, value } = nextProps;
      let { _value } = updateValue(dataSource, value);

      this.setState({
        value: _value,
      });
    }
  }

  onFocus = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      visible: true,
    });
  }

  onChange = (selected) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selected);
    }
    this.setState({ selected, visible: false });
  }

  _displayRender = (data) => {
    const { displayRender, itemRender = Picker.defaultProps.itemRender } = this.props;

    if (typeof displayRender === 'function') {
      return displayRender(data);
    }
    return data.map((v) => itemRender(v)).join('');
  }

  render() {
    const { prefixCls, placeholder, title, dataSource, className, defaultValue, disabled,
      valueMember = Picker.defaultProps.valueMember, itemRender, cols, onMaskClick } = this.props;
    const { visible, value, data } = this.state;
    const cls = classnames(`${prefixCls}`, className, {});
    const inputCls = classnames(`${prefixCls}-input`, {
      [`${prefixCls}-placeholder`] : !value.join(''),
      [`${prefixCls}-disabled`]: !!disabled,
    });

    const display = () => {
      if (this.state.cascade) {
        const cascadeChildren = arrayTreeFilter(this.props.dataSource, (item, level) => {
          return item[valueMember] === value[level];
        });
        return this._displayRender(cascadeChildren);
      }

      const plainChildren = data.map((d, index) => (
        d.filter(obj => value[index] === obj[valueMember])[0]
      )).filter(t => !!t);

      return this._displayRender(plainChildren);
    };

    return (
      <div className={cls} onClick={this.onFocus}>
      {<div className={inputCls}>{display() || placeholder}</div>}
        <div>
        <input
          type="hidden"
          value={this.state.value}
        />
        <Picker
          visible={visible}
          title={title}
          dataSource={dataSource}
          onOk={this.onChange}
          value={value}
          defaultValue={defaultValue}
          valueMember={valueMember}
          placeholder={placeholder}
          itemRender={itemRender}
          cols={cols}
          onMaskClick={onMaskClick}
        />
        </div>
      </div>
    );
  }
}
