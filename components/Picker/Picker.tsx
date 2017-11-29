import React, { Component } from 'react';
import classnames from 'classnames';
import { formatToInit, formatBackToObject, initDataAndValue, updateDataSource, updateValue } from './utils';
import Popup from '../Popup';
import PickerView from '../PickerView';
import { BasePickerProps } from './PropsType';

// 阻止选择器区域的默认事件
function onContainerClick(e) {
  e.stopPropagation();
}
export interface PickerProps extends BasePickerProps {
  prefixCls?: string;
  className?: any;
}

export default class Picker extends Component<PickerProps, any> {

  static Stack: any;

  static defaultProps = {
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    disabled: false,
    dataSource: [],
    onClick: () => {},
    onChange: () => {},
    onOk: () => {},
    onCancel: () => {},
    onMaskClick: () => {},
    prefixCls: 'za-picker',
    valueMember: 'value',
    itemRender: data => data.label,
  };

  private tempValue;

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

    this.tempValue = value;
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
      this.tempValue = _value;
    }

    if ('visible' in nextProps && this.state.visible !== nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  onValueChange = (value) => {
    const { data, cascade } = this.state;
    const { onChange, valueMember, cols } = this.props;
    this.setState({
      value,
    });
    if (typeof onChange === 'function') {
      let _value: any;
      _value = formatBackToObject(data, value, cascade, valueMember, cols);
      onChange(_value);
    }
  }

  onCancel = () => {
    const { onCancel } = this.props;
    this.toggle();
    this.setState({
      value: this.tempValue,
    });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }

  onOk = () => {
    const { onOk, valueMember, cols } = this.props;
    const { data, cascade } = this.state;
    const value = this.getInitValue();
    this.toggle();
    this.setState({
      value,
    });
    this.tempValue = value;
    let _value: any;
    _value = formatBackToObject(data, value, cascade, valueMember, cols);

    if (typeof onOk === 'function') {
      onOk(_value);
    }
  }

  onMaskClick = () => {
    const { onMaskClick } = this.props;
    this.onCancel();
    if (typeof onMaskClick === 'function') {
      onMaskClick();
    }
  }

  getInitValue = () => {
    const data = this.state.data;
    const { valueMember = Picker.defaultProps.valueMember } = this.props;

    const { value } = this.state;

    if (!value || !value.length) {
      if (this.state.cascade) {
        return formatToInit(data[0], valueMember, this.props.cols);
      }
      return data.map(d => (d[0][valueMember]));
    }

    return value;
  }

  // 切换显示状态
  toggle = () => {
    if (this.props.disabled) {
      return;
    }
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    const { prefixCls, className, cancelText, dataSource,
      okText, title, valueMember = Picker.defaultProps.valueMember,
      itemRender = Picker.defaultProps.itemRender } = this.props;
    const { value } = this.state;
    const classes = classnames(`${prefixCls}-container`, className);

    return (
      <div className={`${prefixCls}`}>
        <div className={classes} onClick={e => onContainerClick(e)}>
          <Popup
            visible={this.state.visible}
            onMaskClick={this.onMaskClick}
          >
            <div className={`${prefixCls}-wrapper`}>
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-cancel`} onClick={this.onCancel}>{cancelText}</div>
                <div className={`${prefixCls}-title`}>{title}</div>
                <div className={`${prefixCls}-submit`} onClick={this.onOk}>{okText}</div>
              </div>
              <div className={`${prefixCls}-mask-top`}>
                <div className={`${prefixCls}-mask-bottom`}>
                  <PickerView
                    prefixCls={prefixCls}
                    dataSource={dataSource}
                    value={value}
                    cols={this.props.cols}
                    itemRender={itemRender}
                    valueMember={valueMember}
                    onValueChange={v => this.onValueChange(v)}
                  />
                </div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}
