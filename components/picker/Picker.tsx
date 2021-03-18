import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import Popup from '../popup';
import PickerView from '../picker-view';
import BasePickerProps from './PropsType';
import parseProps from '../picker-view/utils/parseProps';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import { DataSource } from '../picker-view/PropsType';
import { WheelValue, WheelItem } from '../wheel/PropsType';

export interface PickerProps extends BasePickerProps {
  prefixCls?: string;
  className?: string;
}

export interface PickerState {
  value: Array<WheelValue>;
  objValue: Array<WheelItem>;
  dataSource: DataSource;
  tempObjValue?: Array<WheelItem>;
  tempValue?: Array<WheelValue>;
  stopScroll?: boolean;
}

export default class Picker extends Component<PickerProps, PickerState> {
  static defaultProps = {
    dataSource: [],
    prefixCls: 'za-picker',
    valueMember: 'value',
    cols: Infinity,
    maskClosable: true,
    itemRender: (data) => data.label,
    destroy: false,
  };

  state: PickerState = { ...parseProps.getSource(this.props), stopScroll: false };

  static getDerivedStateFromProps(props, state) {
    if (
      !isEqual(
        removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']),
        removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']),
      )
    ) {
      return {
        prevProps: props,
        ...parseProps.getSource(props),
        tempValue: parseProps.getSource(props).value,
        tempObjValue: parseProps.getSource(props).objValue,
      };
    }

    return null;
  }

  onChange = (selected) => {
    const { valueMember, onChange } = this.props;
    const { stopScroll } = this.state;
    const value = selected.map((item) => item[valueMember!]);
    const stateData = stopScroll
      ? { value, objValue: selected, stopScroll: false }
      : { value, objValue: selected };
    this.setState(stateData);

    if (typeof onChange === 'function') {
      onChange(selected);
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    const { tempValue = [], tempObjValue = [] } = this.state;
    this.setState({
      value: tempValue,
      objValue: tempObjValue,
    });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  onOk = async () => {
    this.setState({
      stopScroll: true,
    });

    setTimeout(() => {
      const { objValue } = this.state;

      const { onOk } = this.props;
      if (typeof onOk === 'function') {
        onOk(objValue);
      }
    }, 0);
  };

  render() {
    const {
      prefixCls,
      className,
      cancelText,
      okText,
      title,
      locale,
      maskClosable,
      mountContainer,
      destroy,
      onOk,
      onCancel,
      visible,
      ...others
    } = this.props;
    const { value, stopScroll = false } = this.state;
    const noop = () => {};
    return (
      <Popup
        className={className}
        visible={visible}
        onMaskClick={maskClosable ? this.onCancel : noop}
        mountContainer={mountContainer}
        destroy={destroy}
      >
        <div
          className={prefixCls}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${prefixCls}__header`}>
            <div className={`${prefixCls}__cancel`} onClick={this.onCancel}>
              {cancelText || locale!.cancelText}
            </div>
            <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
            <div className={`${prefixCls}__submit`} onClick={this.onOk}>
              {okText || locale!.okText}
            </div>
          </div>
          <PickerView {...others} value={value} onChange={this.onChange} stopScroll={stopScroll} />
        </div>
      </Popup>
    );
  }
}
