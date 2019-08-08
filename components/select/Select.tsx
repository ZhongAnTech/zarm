import React, { PureComponent } from 'react';
import classnames from 'classnames';
import BaseSelectProps from './PropsType';
import Picker from '../picker';
import parseProps from '../picker-view/utils/parseProps';
import { BasePickerState } from '../picker/PropsType';
import { isArray } from '../utils/validate';

export interface SelectProps extends BaseSelectProps {
  prefixCls?: string;
  className?: string;
}


export default class Select extends PureComponent<SelectProps, BasePickerState> {
  static defaultProps = {
    prefixCls: 'za-select',
    dataSource: [],
    valueMember: 'value',
    itemRender: data => data.label,
    cols: Infinity,
    displayRender: selected => selected.map(item => item.label),
    onClick: () => {},
    visible: false,
  };

  state: BasePickerState = parseProps.getSource(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      const propsToState = parseProps.getSource(nextProps);
      const state: BasePickerState = {
        ...propsToState,
        tempValue: propsToState.value,
        tempObjValue: propsToState.objValue,
        visible: prevState.prevVisible === nextProps.visible ? prevState.visible : nextProps.visible,
        prevVisible: propsToState.visible,
      };
      return state;
    }
    return null;
  }

  handleClick = () => {
    const { disabled } = this.props;
    if (disabled) {
      return false;
    }
    this.setState({
      visible: true,
    });
  };

  onChange = (selected) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selected);
    }
  };

  onOk = (selected) => {
    const { onOk, valueMember } = this.props;
    this.setState({
      value: selected.map(item => item[valueMember!]),
      objValue: selected,
      visible: false,
    }, () => {
      if (typeof onOk === 'function') {
        onOk(selected);
      }
    });
  };

  // 点击取消
  onCancel = () => {
    const { onCancel } = this.props;
    const { tempValue = [], tempObjValue = [] } = this.state;
    this.setState({
      value: tempValue,
      objValue: tempObjValue,
      visible: false,
    }, () => {
      if (typeof onCancel === 'function') {
        onCancel();
      }
    });
  };

  isValueValid = (value) => {
    return (Object.prototype.toString.call(value) === '[object String]' && !!value.trim()) || (isArray(value) && value.length > 0 && value.some(item => !!item));
  };

  render() {
    const { prefixCls, placeholder, className, disabled, displayRender, locale, ...others } = this.props;
    const { visible, objValue, value } = this.state;
    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--placeholder`]: !this.isValueValid(value),
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <div className={cls} onClick={this.handleClick}>
        <div className={`${prefixCls}__input`}>
          {(this.isValueValid(value) && displayRender!(objValue || [])) || placeholder || locale!.placeholder}
        </div>
        <Picker
          {...others}
          visible={visible}
          value={value}
          onOk={this.onOk}
          onChange={this.onChange}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
