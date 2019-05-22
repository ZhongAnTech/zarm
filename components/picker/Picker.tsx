import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Popup from '../popup';
import PickerView from '../picker-view';
import { BasePickerProps } from './PropsType';
import parseProps from '../picker-view/utils/parseProps';

export interface PickerProps extends BasePickerProps {
  prefixCls?: string;
  className?: any;
}

export default class Picker extends PureComponent<PickerProps, any> {
  static defaultProps = {
    dataSource: [],
    prefixCls: 'za-picker',
    valueMember: 'value',
    cols: Infinity,
    itemRender: data => data.label,
  };

  private tempValue;

  private tempObjValue;

  private isScrolling = false;

  constructor(props) {
    super(props);
    this.state = parseProps.getSource(props);

    const { value, objValue } = this.state;
    this.tempValue = value;
    this.tempObjValue = objValue;
  }

  componentWillReceiveProps(nextProps) {
    const state = parseProps.getSource(nextProps);
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
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      value: this.tempValue,
      objValue: this.tempObjValue,
      visible: false,
    });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  onOk = () => {
    if (this.isScrolling) {
      return false;
    }
    const { value, objValue } = this.state;
    this.setState({
      value,
      objValue,
      visible: false,
    });

    const { onOk } = this.props;
    if (typeof onOk === 'function') {
      onOk(objValue);
    }
  };

  onMaskClick = () => {
    const { onMaskClick } = this.props;
    if (typeof onMaskClick === 'function') {
      onMaskClick();
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
    const { prefixCls, className, cancelText, okText, title, children, locale, ...others } = this.props;
    const { visible, value } = this.state;
    const cls = classnames(prefixCls, className);

    return (
      <Popup
        visible={visible}
        onMaskClick={this.onMaskClick}
      >
        <div className={cls} onClick={(e) => { e.stopPropagation(); }}>
          <div className={`${prefixCls}__header`}>
            <div className={`${prefixCls}__cancel`} onClick={this.onCancel}>{cancelText || locale!.cancelText}</div>
            <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
            <div className={`${prefixCls}__submit`} onClick={this.onOk}>{okText || locale!.okText}</div>
          </div>
          <PickerView
            {...others}
            visible={visible}
            value={value}
            onChange={this.onChange}
            onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
          />
        </div>
      </Popup>
    );
  }
}
