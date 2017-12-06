import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import defaultLocale from './locale/zh_CN';
import formatFn from '../DatePickerView/utils';
import Popup from '../Popup';
import DatePickerView from '../DatePickerView';

const DATE = 'date';

// 阻止选择器区域的默认事件
function stopClick(e) {
  e.stopPropagation();
}

// 转成Date格式
function getGregorianCalendar(arg) {
  return new Date(...arg);
}

function isExtendDate(date) {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
}

export interface DatePickerProps extends PropsType {
  prefixCls?: string;
  className?: any;
}

export default class DatePicker extends Component<DatePickerProps, any> {

  static defaultProps = {
    placeholder: '请选择',
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    mode: DATE,
    disabled: false,
    value: '',
    defaultValue: '',
    locale: defaultLocale,
    minuteStep: 1,
    prefixCls: 'za-picker',
    valueMember: 'value',
    onClick: () => {},
    onCancel: () => {},
  };

  private initDate;
  private defaultMinDate;

  constructor(props) {
    super(props);

    const date = props.value && isExtendDate(props.value);
    const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);
    const display = props.wheelDefaultValue && isExtendDate(props.wheelDefaultValue);

    this.initDate = date;

    this.state = {
      visible: props.visible || false,
      date: date || defaultDate,
      value: props.value || '',
      display,
    };
  }

  componentWillReceiveProps(nextProps) {
    const date = nextProps.value && isExtendDate(nextProps.value);
    const defaultDate = nextProps.defaultValue && isExtendDate(nextProps.defaultValue);

    this.setState({
      date: date || defaultDate,
      value: nextProps.value,
    });
    this.initDate = date || defaultDate;

    if ('visible' in nextProps && this.state.visible !== nextProps.visible) {
      this.setState({ visible: nextProps.visible });
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
  onOk() {
    const { onOk } = this.props;
    const value = this.getDate();
    this.setState({
      value: value,
    });
    this.initDate = value;
    this.toggle();
    if (typeof onOk === 'function') {
      onOk(value);
    }
  }

  getDefaultMinDate() {
    if (!this.defaultMinDate) {
      this.defaultMinDate = getGregorianCalendar([2000, 0, 1, 0, 0, 0]);
    }
    return this.defaultMinDate;
  }

  getDefaultDate() {
    // 存在最小值且毫秒数大于现在
    if (this.props.min && Date.parse(this.getMinDate()) >= Date.now()) {
      return this.getMinDate();
    }
    return new Date();
  }

  getDate() {
    return this.state.value || this.state.date || this.state.display || this.getDefaultDate();
  }

  getMinDate() {
    const minDate = isExtendDate(this.props.min);
    return minDate || this.getDefaultMinDate();
  }

  // 切换显示状态
  toggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  close(key) {
    this.setState({
      [`${key}`]: false,
    });
  }

  onValueChange(newValue) {
    const { onChange, onValueChange } = this.props;
    this.setState({
      value: newValue,
    });

    if (typeof onValueChange === 'function') {
      onValueChange(newValue);
    }

    if (typeof onChange === 'function') {
      onChange(formatFn(this, newValue));
    }
  }

  render() {
    const { prefixCls, className, title, okText, cancelText, placeholder, disabled,
       ...others } = this.props;
    const { visible, value } = this.state;

    const classes = classnames({
      [`${prefixCls}-container`]: true,
      [`${prefixCls}-hidden`]: !visible,
      [className]: !!className,
    });

    return (
      <div className={prefixCls}>
        <div className={classes} onClick={e => stopClick(e)}>
          <Popup
            visible={visible}
            onMaskClick={() => this.onMaskClick()}
          >
            <div className={`${prefixCls}-wrapper`}>
              <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-cancel`} onClick={() => this.onCancel()}>{cancelText}</div>
                <div className={`${prefixCls}-title`}>{title}</div>
                <div className={`${prefixCls}-submit`} onClick={() => this.onOk()}>{okText}</div>
              </div>
              <div className={`${prefixCls}-mask-top`}>
                <div className={`${prefixCls}-mask-bottom`}>
                  <DatePickerView
                    prefixCls={prefixCls}
                    className={className}
                    {...others}
                    onValueChange={(newValue) => this.onValueChange(newValue)}
                    value={value}
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
