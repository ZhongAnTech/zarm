import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseDateSelectProps } from './PropsType';
import formatFn from '../date-picker-view/utils';
import DatePicker from '../date-picker';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

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

class DateSelect extends PureComponent<DateSelectProps, any> {
  static defaultProps = {
    mode: 'date',
    disabled: false,
    minuteStep: 1,
    prefixCls: 'za-date-select',
    valueMember: 'value',
    onCancel: () => {},
  };

  private isScrolling;

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
    if (this.isScrolling) {
      return false;
    }
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

  onTransition(isScrolling) {
    this.isScrolling = isScrolling;
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
    const { prefixCls, className, placeholder, disabled, onChange, locale, ...others } = this.props;
    const { value, visible } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--placeholder`]: !this.state.value,
      [`${prefixCls}--disabled`]: disabled,
    });

    return(
      <div className={cls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, this.state.value)} />
        <div className={`${prefixCls}__input`}>
          {this.state.value ? formatFn(this, this.state.value) : placeholder || locale.placeholder}
        </div>
        <DatePicker
          {...others}
          visible={visible}
          value={value}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
        />
      </div>
    );
  }
}

export default LocaleReceiver(DateSelect, 'DateSelect');
