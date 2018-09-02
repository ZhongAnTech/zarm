import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Popup from '../popup';
import PickerView from '../picker-view';
import { BasePickerProps } from './PropsType';
import getState from '../utils/getState';

export interface PickerProps extends BasePickerProps {
  prefixCls?: string;
  className?: any;
}

export default class Picker extends PureComponent<PickerProps, any> {
  static defaultProps = {
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    dataSource: [],
    prefixCls: 'za-picker',
    valueMember: 'value',
    cols: Infinity,
    itemRender: data => data.label,
  };

  private tempValue;
  private tempObjValue;
  private isScrolling;

  constructor(props) {
    super(props);
    this.state = getState(props);
    this.tempValue = this.state.value;
    this.tempObjValue = this.state.objValue;
  }

  componentWillReceiveProps(nextProps) {
    const state = getState(nextProps);
    this.setState(state);
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
    if (this.isScrolling) {
      return false;
    }
    const { value, objValue } = this.state;
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

  onTransition(isScrolling) {
    const { onTransition } = this.props;
    this.isScrolling = isScrolling;
    if (typeof onTransition === 'function') {
      onTransition(isScrolling);
    }
  }

  render() {
    const { prefixCls, className, cancelText, okText, title, children, ...others } = this.props;
    const { visible, value } = this.state;

    const cls = classnames(prefixCls, className);

    return (
      <div className={cls}>
        <Popup
          visible={visible}
          onMaskClick={this.onMaskClick}
        >
          <div className={`${prefixCls}-wrapper`} onClick={(e) => {e.stopPropagation(); }}>
            <div className={`${prefixCls}-header`}>
              <div className={`${prefixCls}-cancel`} onClick={this.onCancel}>{cancelText}</div>
              <div className={`${prefixCls}-title`}>{title}</div>
              <div className={`${prefixCls}-submit`} onClick={this.onOk}>{okText}</div>
            </div>
            <PickerView
              {...others}
              prefixCls={prefixCls}
              visible={visible}
              value={value}
              onChange={this.onChange}
              onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
            />
          </div>
        </Popup>
      </div>
    );
  }
}
