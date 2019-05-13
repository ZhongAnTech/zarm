import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { BaseDateSelectProps } from './PropsType';
import formatFn from '../date-picker-view/utils';
import DatePicker from '../date-picker';

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
    mode: 'date',
    disabled: false,
    minuteStep: 1,
    prefixCls: 'za-date-select',
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
    const { visible } = this.state;
    const date = nextProps.value && isExtendDate(nextProps.value);
    const defaultDate = nextProps.defaultValue && isExtendDate(nextProps.defaultValue);

    this.setState({
      value: date || defaultDate,
    });

    if ('visible' in nextProps && nextProps.visible !== visible) {
      this.setState({
        visible: nextProps.visible,
      });
    }
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
    const { onOk } = this.props;
    this.setState({ visible: false });
    if (typeof onOk === 'function') {
      onOk(selected);
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({ visible: false });
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  render() {
    const { prefixCls, className, placeholder, disabled, onChange, locale, ...others } = this.props;
    const { value, visible } = this.state;

    const cls = classnames(prefixCls, className, {
      [`${prefixCls}--placeholder`]: !value,
      [`${prefixCls}--disabled`]: disabled,
    });

    return (
      <div className={cls} onClick={this.handleClick}>
        <input type="hidden" value={formatFn(this, value)} />
        <div className={`${prefixCls}__input`}>
          {value ? formatFn(this, value) : placeholder || locale!.placeholder}
        </div>
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
