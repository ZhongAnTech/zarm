import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseDateSelectProps } from './PropsType';
import formatFn from '../DatePickerView/utils';
import DatePicker from '../DatePicker';

const isExtendDate = (date) => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  return new Date(date.toString().replace(/-/g, '/'));
};

export interface DateSelectProps extends BaseDateSelectProps {
  prefixCls?: string;
  className?: any;
}

export default class DateSelect extends PureComponent<DateSelectProps, any> {

  static defaultProps = {
    placeholder: '请选择',
    title: '请选择',
    cancelText: '取消',
    okText: '确定',
    mode: 'date',
    disabled: false,
    minuteStep: 1,
    prefixCls: 'za-select',
    valueMember: 'value',
    onCancel: () => {},
  };

  constructor(props) {
    super(props);

    const date = props.value && isExtendDate(props.value);
    const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);

    this.state = {
      value: defaultDate || date,
      visible: props.visible || false,
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

  handleClick = () => {
    this.toggle();
  }

  // 切换显示状态
  toggle() {
    if (this.props.disabled) {
      return;
    }

    this.setState({
      visible: !this.state.visible,
    });
  }

  onChange = (selected) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selected);
    }
  }

  onOk = (selected) => {
    const { onOk } = this.props;
    if (typeof onOk === 'function') {
      onOk(selected);
    }
    this.setState({ visible: false });
  }

  // 点击取消
  onCancel = () => {
    const { onCancel } = this.props;
    this.toggle();
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }

  render() {
    const { prefixCls, className, title, okText, cancelText, placeholder, disabled,
      onChange, ...others } = this.props;
    const { value, visible } = this.state;
    const inputCls = classnames({
      [`${prefixCls}-input`]: true,
      [`${prefixCls}-placeholder`]: !this.state.value,
      [`${prefixCls}-disabled`]: !!disabled,
    });

    return(
      <div className={inputCls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, this.state.value)} />
        {this.state.value ? formatFn(this, this.state.value) : placeholder}
        <DatePicker
          {...others}
          visible={visible}
          value={value}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
