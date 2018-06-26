import React, { Component } from 'react';
import { BaseDatePickerProps } from './PropsType';
import Popup from '../popup';
import DatePickerView from '../date-picker-view';

const isExtendDate = (date) => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
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
    minuteStep: 1,
    prefixCls: 'za-picker',
    valueMember: 'value',
    onCancel: () => {},
    onInit: () => {},
  };

  private initDate;
  private isScrolling;

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
    if (this.isScrolling) {
      return false;
    }
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

  onTransition(isScrolling) {
    const { onTransition } = this.props;
    this.isScrolling = isScrolling;
    if (typeof onTransition === 'function') {
      onTransition(isScrolling);
    }
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

    // const classes = classnames({
    //   [`${prefixCls}-container`]: true,
    //   [`${prefixCls}-hidden`]: !visible,
    //   [className]: !!className,
    // });

    // const cls = classnames(prefixCls, className);

    return (
      <Popup
        visible={visible}
        onMaskClick={() => this.onMaskClick()}
      >
        <div className={`${prefixCls}-wrapper`} onClick={(e) => {e.stopPropagation(); }}>
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
            onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
          />
        </div>
      </Popup>
    );
  }
}
