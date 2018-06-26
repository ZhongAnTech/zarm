import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseSelectProps } from './PropsType';
import Picker from '../picker';

const getValue = (props, defaultValue?: any) => {
  if (props.value) {
    return [].concat(props.value);
  }

  if (props.defaultValue) {
    return [].concat(props.defaultValue);
  }

  return defaultValue;
};

export interface SelectProps extends BaseSelectProps {
  prefixCls?: string;
  className?: string;
}

export default class Select extends PureComponent<SelectProps, any> {
  static defaultProps = {
    prefixCls: 'za-select',
    valueMember: 'value',
    placeholder: '请选择',
    itemRender: data => data.label,
    displayRender: selected => selected.map(item => item.label),
    onClick: () => {},
  };

  private tempValue;
  private tempObjValue;
  private isScrolling;

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      value: getValue(props, []),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: getValue(nextProps, []),
    });
    if ('visible' in nextProps && nextProps.visible !== this.state.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  onInit = (selected) => {
    const { valueMember } = this.props;
    const { value } = this.state;
    const firstValue = selected.map(item => item[valueMember!]);

    this.tempValue = this.isValueValid(value) ? firstValue : [] ;
    this.tempObjValue = this.isValueValid(value) ? selected : [];

    this.setState({
      firstObjValue: selected,
    });
  }

  handleClick = () => {
    if (this.isScrolling) {
      return false;
    }
    this.toggle();
  }

  toggle() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      visible: !this.state.visible,
    });
  }

  onTransition(isScrolling) {
    this.isScrolling = isScrolling;
  }

  onChange = (selected) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selected);
    }
  }

  // onChange = (selected) => {
  //   const { valueMember, onChange } = this.props;
  //   const value = selected.map(item => item[valueMember!]);
  //   this.setState({
  //     value,
  //     objValue: selected,
  //   });

  //   if (typeof onChange === 'function') {
  //     onChange(selected);
  //   }
  // }

  onOk = (selected) => {
    if (this.isScrolling) {
      return false;
    }
    this.toggle();
    const { onOk, valueMember } = this.props;
    this.setState({
      value: selected.map(item => item[valueMember!]),
      objValue: selected,
    });
    this.tempValue = selected.map(item => item[valueMember!]);
    this.tempObjValue = selected;
    if (typeof onOk === 'function') {
      onOk(selected);
    }
  }

  // 点击取消
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

  isValueValid(value) {
    return value.length > 0 && value.some(item => !!item);
  }

  render() {
    const { prefixCls, placeholder, className, disabled, displayRender, ...others } = this.props;
    const { visible, value, objValue, firstObjValue } = this.state;
    const cls = classnames(`${prefixCls}`, className);

    const inputCls = classnames(`${prefixCls}-input`, {
      [`${prefixCls}-placeholder`]: !this.isValueValid(value),
      [`${prefixCls}-disabled`]: !!disabled,
    });

    return (
      <div className={cls} onClick={this.handleClick}>
        <div className={inputCls}>
          {this.isValueValid(value) && displayRender!(objValue || firstObjValue || []) || placeholder}
        </div>
        <Picker
          {...others}
          visible={visible}
          value={value}
          firstObjValue={firstObjValue}
          onInit={this.onInit}
          onOk={this.onOk}
          onChange={this.onChange}
          onCancel={this.onCancel}
          onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
        />
      </div>
    );
  }
}
