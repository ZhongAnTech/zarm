import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import Popup from '../popup';
import PickerView from '../picker-view';
import BasePickerProps from './PropsType';
import parseProps from '../picker-view/utils/parseProps';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';

export interface PickerProps extends BasePickerProps {
  prefixCls?: string;
  className?: any;
}

export type DataSource = Array<{ [key: string]: any; children?: DataSource }>;

export interface PickerState {
  value: string[] | number[];
  objValue?: Array<{ [key: string]: any }>;
  dataSource: DataSource;
  tempObjValue?: Array<{ [key: string]: any }>;
  tempValue?: string[] | number[];
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

  private isScrolling = false;

  state: PickerState = parseProps.getSource(this.props);

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']), removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']))) {
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
    const value = selected.map((item) => item[valueMember!]);
    this.setState({
      value,
      objValue: selected,
    });

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

  onOk = () => {
    if (this.isScrolling) {
      return false;
    }
    const { value, objValue = [] } = this.state;
    this.setState({
      value,
      objValue,
    });

    const { onOk } = this.props;
    if (typeof onOk === 'function') {
      onOk(objValue);
    }
  };

  onTransition = (isScrolling) => {
    const { onTransition } = this.props;
    this.isScrolling = isScrolling;
    if (typeof onTransition === 'function') {
      onTransition(isScrolling);
    }
  };

  render() {
    const { prefixCls, className, cancelText, okText, title, locale, maskClosable, getContainer, destroy, onOk, onCancel, visible, ...others } = this.props;
    const { value } = this.state;
    const cls = classnames(prefixCls, className);
    const noop = () => {};
    return (
      <Popup
        visible={visible}
        onMaskClick={maskClosable ? this.onCancel : noop}
        getContainer={getContainer}
        destroy={destroy}
      >
        <div className={cls} onClick={(e) => { e.stopPropagation(); }}>
          <div className={`${prefixCls}__header`}>
            <div className={`${prefixCls}__cancel`} onClick={this.onCancel}>{cancelText || locale!.cancelText}</div>
            <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
            <div className={`${prefixCls}__submit`} onClick={this.onOk}>{okText || locale!.okText}</div>
          </div>
          <PickerView
            {...others}
            value={value}
            onChange={this.onChange}
            onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
          />
        </div>
      </Popup>
    );
  }
}
