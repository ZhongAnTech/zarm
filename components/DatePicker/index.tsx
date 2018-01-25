import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import { BaseDatePickerProps } from './PropsType';
import defaultLocale from './locale/zh_CN';
import Popup from '../Popup';
import DatePickerView from '../DatePickerView';

const isExtendDate = (date) => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
};

// 阻止选择器区域的默认事件
const stopPropagation = (e) => {
  e.stopPropagation();
  // e.nativeEvent.stopImmediatePropagation();
};

export interface DatePickerProps extends BaseDatePickerProps {
  prefixCls?: string;
  className?: any;
}

export default class DatePicker extends Component<DatePickerProps, any> {

  static defaultProps = {
    placeholder: '请选择',
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    mode: 'date',
    disabled: false,
    value: '',
    defaultValue: '',
    locale: defaultLocale,
    minuteStep: 1,
    prefixCls: 'za-picker',
    valueMember: 'value',
    onCancel: () => {},
    onInit: () => {},
  };

  private initDate;

  constructor(props) {
    super(props);

    const date = props.value && isExtendDate(props.value);
    const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);

    this.state = {
      visible: props.visible || false,
      value: defaultDate || date,
    };
  }

  componentWillReceiveProps(nextProps) {
    const date = nextProps.value && isExtendDate(nextProps.value);
    const defaultDate = nextProps.defaultValue && isExtendDate(nextProps.defaultValue);

    this.setState({
      value: date || defaultDate,
    });

    if ('visible' in nextProps && nextProps.visible !== this.state.visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
  }

  // 点击遮罩层
  onMaskClick() {
    const { onMaskClick } = this.props;
    this.onCancel();
    if (typeof onMaskClick === 'function') {
      onMaskClick();
    }
  }

  // 点击取消
  onCancel() {
    const { onCancel } = this.props;
    this.toggle();
    this.setState({
      value: this.initDate,
    });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }

  // 点击确定
  onOk = () => {
    const { onOk } = this.props;
    const value = this.state.value || this.initDate;
    this.setState({
      value: value,
    });
    if (typeof onOk === 'function') {
      onOk(value);
    }
    this.toggle();
  }

  // 切换显示状态
  toggle = (visible = false) => {
    this.setState({ visible });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  onInit = (selected) => {
    const { onInit } = this.props;
    this.initDate = selected;
    if (typeof onInit === 'function') {
      onInit(selected);
    }
  }

  onValueChange = (newValue) => {
    const { onChange } = this.props;
    this.setState({
      value: newValue,
    });

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  }

  render() {
    const { prefixCls, className, title, okText, cancelText, children, disabled,
       ...others } = this.props;
    const { visible, value } = this.state;

    const classes = classnames({
      [`${prefixCls}-container`]: true,
      [`${prefixCls}-hidden`]: !visible,
      [className]: !!className,
    });

    const content = children && cloneElement(children, {
      onClick: () => this.toggle(true),
    });

    return (
      <div className={prefixCls}>
        <div className={classes} onClick={stopPropagation}>
          <Popup
            visible={visible}
            onMaskClick={() => this.onMaskClick()}
          >
            <div className={`${prefixCls}-wrapper`}>
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-cancel`} onClick={() => this.onCancel()}>{cancelText}</div>
                <div className={`${prefixCls}-title`}>{title}</div>
                <div className={`${prefixCls}-submit`} onClick={this.onOk}>{okText}</div>
              </div>
              <DatePickerView
                prefixCls={prefixCls}
                className={className}
                {...others}
                value={value}
                onInit={this.onInit}
                onChange={this.onValueChange}
              />
            </div>
          </Popup>
          {content}
        </div>
      </div>
    );
  }
}
