import React, { Component } from 'react';
import classnames from 'classnames';
import { BaseSelectProps } from './PropsType';
import { hasChildrenObject, isArray, arrayTreeFilter } from '../Picker/utils';
import Picker from '../Picker';

export interface SelectProps extends BaseSelectProps {
  prefixCls?: string;
  className?: string;
}

export default class InputSelect extends Component<SelectProps, any> {

  static defaultProps = {
    prefixCls: 'za-select',
    itemRender: data => data.label,
    valueMember: 'value',
  };

  constructor(props) {
    super(props);

    const initValue = props.value || props.defaultValue || [];
    const { dataSource } = props;
    let _data: any;
    let _value = null;

    // 针对单列数据源，转换为[[{}]]
    if (dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0])) {
      _data = [props.dataSource];
      _value = isArray(initValue) ? initValue : [initValue];
    } else {
      _data = dataSource;
      _value = initValue;
    }

    this.state = {
      visible: props.visible || false,
      value: _value,
      data: _data,
      cascade: dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
      const { dataSource } = nextProps;
      let _data: any;

      if (dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0])) {
        _data = [nextProps.dataSource];
      } else {
        _data = nextProps.dataSource;
      }
      this.setState({
        data: _data,
        cascade: dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]),
      });
    }

    if ('value' in nextProps && nextProps.value !== this.props.value) {
      let _value = null;
      const { dataSource } = nextProps;

      if (dataSource.length && !isArray(dataSource[0]) && !hasChildrenObject(dataSource[0])) {
        _value = isArray(nextProps.value) ? nextProps.value : [nextProps.value];
      } else {
        _value = nextProps.value;
      }

      this.setState({
        value: _value,
        cascade: dataSource.length && !isArray(dataSource[0]) && hasChildrenObject(dataSource[0]),
      });
    }

    // if ('visible' in nextProps && this.state.visible !== nextProps.visible) {
    //   this.setState({ visible: nextProps.visible });
    // }
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
      valueMember = Picker.defaultProps.valueMember, itemRender, cols } = this.props;
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
        />
        </div>
      </div>
    );
  }
}
