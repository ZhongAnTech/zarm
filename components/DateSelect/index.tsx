import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import formatFn from '../DatePickerView/utils';
import DatePicker from '../DatePicker';

function isExtendDate(date) {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
}

export interface DateSelectProps extends PropsType {
  prefixCls?: string;
  className?: any;
}

const DATE = 'date';

export default class DateSelect extends Component<DateSelectProps, any> {

  static defaultProps = {
    placeholder: '请选择',
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    mode: DATE,
    disabled: false,
    value: '',
    defaultValue: '',
    minuteStep: 1,
    prefixCls: 'za-select',
    valueMember: 'value',
    onClick: () => {},
    onCancel: () => {},
  };

  constructor(props) {
    super(props);

    const date = props.value && isExtendDate(props.value);
    const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);

    this.state = {
      visible: props.visible || false,
      date: defaultDate || date,
      value: props.defaultValue || props.value || '',
    };

  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const date = nextProps.value && isExtendDate(nextProps.value);
      const defaultDate = nextProps.defaultValue && isExtendDate(nextProps.defaultValue);

      this.setState({
        date: date || defaultDate,
        value: nextProps.value,
      });
    }
  }

  handleClick = () => {
    this.props.onClick();
    if (!this.props.disabled) {
      this.toggle();
    }
  }

  // 切换显示状态
  toggle() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  onChange = (newValue) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
    this.setState({ visible: false });
  }

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ visible: false });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }

  render() {
    const { prefixCls, className, title, okText, cancelText, placeholder, disabled,
      onChange, ...others } = this.props;
    const { value } = this.state;
    const inputCls = classnames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-placeholder`]: !this.state.date,
      [`${prefixCls}-disabled`]: !!disabled,
    });

    return(
      <div className={inputCls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, this.state.date)} />
        {this.state.date ? formatFn(this, this.state.date) : placeholder}
        <DatePicker
          visible={this.state.visible}
          onOk={this.onChange}
          value={value}
          {...others}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
