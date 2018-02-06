import React, { PureComponent, cloneElement } from 'react';
import classnames from 'classnames';
import Popup from '../Popup';
import PickerView from '../PickerView';
import { BasePickerProps } from './PropsType';

const getValue = (props, defaultValue?: any) => {
  if ('value' in props && props.value.length > 0) {
    return [].concat(props.value);
  }

  if ('defaultValue' in props && props.defaultValue.length > 0) {
    return [].concat(props.defaultValue);
  }

  return defaultValue;
};

const stopPropagation = (e) => {
  e.stopPropagation();
  // e.nativeEvent.stopImmediatePropagation();
};

export interface PickerProps extends BasePickerProps {
  prefixCls?: string;
  className?: any;
}

export default class Picker extends PureComponent<PickerProps, any> {

  static Stack: any;

  static defaultProps = {
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    dataSource: [],
    prefixCls: 'za-picker',
    valueMember: 'value',
    itemRender: data => data.label,
  };

  private tempValue;
  private tempObjValue;

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      value: getValue(props, []),
      objValue: [],
    };

    this.tempValue = this.state.value;
    this.tempObjValue = this.state.objValue;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      value: getValue(nextProps, []),
    });
  }

  onInit = (selected) => {
    const { valueMember, onInit } = this.props;
    this.setState({
      firstValue: selected.map(item => item[valueMember!]),
      firstObjValue: selected,
    });
    // this.firstValue = selected.map(item => item[valueMember!]);
    // this.firstObjValue = selected;

    if (typeof onInit === 'function') {
      onInit(selected);
    }
  }

  onChange = (selected) => {
    const { valueMember, onChange } = this.props;
    const value = selected.map(item => item[valueMember!]);
    this.setState({
      value,
      objValue: selected,
    });

    if (typeof onChange === 'function') {
      onChange(selected);
    }
  }

  onCancel = () => {
    const { onCancel } = this.props;
    this.toggle();
    this.setState({
      value: this.tempValue,
      objValue: this.tempObjValue,
    });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }

  onOk = () => {
    const value = this.state.value.length === 0 ? this.state.firstValue : this.state.value;
    const objValue = this.state.objValue.length === 0 ? this.state.firstObjValue : this.state.objValue;

    this.setState({
      value,
      objValue,
    });

    const { onOk } = this.props;
    if (typeof onOk === 'function') {
      onOk(objValue);
    }
    this.toggle();
  }

  onMaskClick = () => {
    const { onMaskClick } = this.props;
    this.onCancel();
    if (typeof onMaskClick === 'function') {
      onMaskClick();
    }
  }

  // 切换显示状态
  toggle = (visible = false) => {
    this.setState({ visible });
  }

  render() {
    const { prefixCls, className, cancelText, okText, title, children, ...others } = this.props;
    const { visible, value, firstObjValue } = this.state;

    const cls = classnames(prefixCls, className);
    const content = children && cloneElement(children, {
      onClick: () => this.toggle(true),
    });

    return (
      <div className={cls} onClick={stopPropagation}>
        <Popup
          visible={visible}
          onMaskClick={this.onMaskClick}
        >
          <div className={`${prefixCls}-wrapper`}>
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-cancel`} onClick={this.onCancel}>{cancelText}</div>
              <div className={`${prefixCls}-title`}>{title}</div>
              <div className={`${prefixCls}-submit`} onClick={this.onOk}>{okText}</div>
            </div>
            <PickerView
              {...others}
              prefixCls={prefixCls}
              value={value}
              firstObjValue={firstObjValue}
              onInit={this.onInit}
              onChange={this.onChange}
            />
          </div>
        </Popup>
        {content}
      </div>
    );
  }
}
