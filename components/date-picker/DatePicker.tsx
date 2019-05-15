import React, { Component } from 'react';
import classnames from 'classnames';
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
  className?: string;
}

export default class DatePicker extends Component<DatePickerProps, any> {
  static defaultProps = {
    mode: 'date',
    value: '',
    defaultValue: '',
    minuteStep: 1,
    prefixCls: 'za-date-picker',
    valueMember: 'value',
    onCancel: () => {},
    onInit: () => {},
  };

  private initDate;

  private isScrolling = false;

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

  onMaskClick = () => {
    const { onMaskClick } = this.props;
    if (typeof onMaskClick === 'function') {
      onMaskClick();
    }
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      value: this.initDate,
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

    const { onOk } = this.props;
    const { value } = this.state;
    const newValue = value || this.initDate;

    this.setState({
      value: newValue,
      visible: false,
    });
    if (typeof onOk === 'function') {
      onOk(newValue);
    }
  };

  onTransition = (isScrolling) => {
    const { onTransition } = this.props;
    this.isScrolling = isScrolling;
    if (typeof onTransition === 'function') {
      onTransition(isScrolling);
    }
  };

  onInit = (selected) => {
    const { onInit } = this.props;
    this.initDate = selected;
    if (typeof onInit === 'function') {
      onInit(selected);
    }
  };

  onValueChange = (newValue) => {
    const { onChange } = this.props;
    this.setState({
      value: newValue,
    });

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  close = (key) => {
    this.setState({
      [`${key}`]: false,
    });
  };

  render() {
    const { prefixCls, className, title, okText, cancelText, children, locale, ...others } = this.props;
    const cls = classnames(prefixCls, className);
    const { visible, value } = this.state;

    return (
      <Popup
        visible={visible}
        onMaskClick={() => this.onMaskClick()}
      >
        <div className={cls} onClick={(e) => { e.stopPropagation(); }}>
          <div className={`${prefixCls}__header`}>
            <div
              className={`${prefixCls}__cancel`}
              onClick={this.onCancel}
            >
              {cancelText || locale!.cancelText}
            </div>
            <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
            <div className={`${prefixCls}__submit`} onClick={this.onOk}>{okText || locale!.okText}</div>
          </div>
          <DatePickerView
            {...others}
            className={className}
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
