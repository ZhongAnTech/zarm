import React, { Component } from 'react';
import { formatBackToObject, initDataAndValue, updateDataSource, updateValue } from '../Picker/utils';
import Wheel from '../Wheel';
import { BasePickerViewProps } from './PropsType';

export interface PickerViewProps extends BasePickerViewProps {
  prefixCls?: string;
  className?: any;
}

export default class PickerView extends Component<PickerViewProps, any> {

  static defaultProps = {
    visible: true,
    disabled: false,
    dataSource: [],
    onChange: () => {},
    prefixCls: 'za-picker',
    valueMember: 'value',
    itemRender: data => data.label,
  };

  constructor(props) {
    super(props);

    const initValue = props.value || props.defaultValue || [];

    let { data , value, cascade } = initDataAndValue(props.dataSource, initValue);

    this.state = {
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

  onValueChange = (value) => {
    const { data, cascade } = this.state;
    const { onChange, onValueChange, valueMember, cols } = this.props;
    this.setState({
      value,
    });
    if (typeof onChange === 'function') {
      let _value: any;
      _value = formatBackToObject(data, value, cascade, valueMember, cols);
      onChange(_value);
    }

    if (typeof onValueChange === 'function') {
      onValueChange(value);
    }
  }

  render() {
    const { prefixCls, valueMember, visible, itemRender } = this.props;
    const { data, value } = this.state;
    let PickerCol: JSX.Element;

    const cols = data.map((d) => {
      return { props: { children: d } };
    });

    if (this.state.cascade) {
      PickerCol = (
        <Wheel.Cascader
          data={data}
          value={value}
          cols={this.props.cols}
          itemRender={itemRender}
          valueMember={valueMember}
          onChange={v => this.onValueChange(v)}
        />
      );
    } else {
      PickerCol = (
        <Wheel.Group
          itemRender={itemRender}
          valueMember={valueMember}
          selectedValue={value}
          onValueChange={v => this.onValueChange(v)}
        >
          {cols}
        </Wheel.Group>
      );
    }

    return visible
      ? (
        <div className={`${prefixCls}-mask-top`}>
          <div className={`${prefixCls}-mask-bottom`}>
            {PickerCol}
          </div>
        </div>
      )
      : null;
  }
}
