import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import Popup from '../popup';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import DatePickerView from '../date-picker-view';
import { parseState } from '../date-picker-view/utils/parseState';
import type { BaseDatePickerProps } from './PropsType';

export interface DatePickerProps extends BaseDatePickerProps {
  prefixCls?: string;
  className?: string;
}

export default class DatePicker extends Component<DatePickerProps, any> {
  static defaultProps: DatePickerProps = {
    mode: 'date',
    minuteStep: 1,
    prefixCls: 'za-date-picker',
    valueMember: 'value',
    maskClosable: true,
    onCancel: () => {},
    onInit: () => {},
  };

  static getDerivedStateFromProps(props, state) {
    if (
      !isEqual(
        removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']),
        removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']),
      )
    ) {
      return {
        prevProps: props,
        ...parseState(props),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = { ...parseState(props), stopScroll: false };
  }

  onCancel = () => {
    const { onCancel } = this.props;
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  onOk = () => {
    const { onOk } = this.props;
    this.setState(
      {
        stopScroll: true,
      },
      () => {
        this.setState(
          {
            stopScroll: false,
          },
          () => {
            if (typeof onOk === 'function') {
              onOk(this.state.date);
            }
          },
        );
      },
    );
  };

  onInit = (selected) => {
    this.setState({
      date: selected,
    });
  };

  onValueChange = (newValue) => {
    const { onChange } = this.props;
    this.setState({
      date: newValue,
    });

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  render() {
    const {
      prefixCls,
      className,
      title,
      okText,
      cancelText,
      locale,
      mountContainer,
      maskClosable,
      onOk,
      onCancel,
      onInit,
      visible,
      ...others
    } = this.props;
    const { date, stopScroll } = this.state;
    const noop = () => {};

    return (
      <Popup
        className={className}
        visible={visible}
        onMaskClick={maskClosable ? this.onCancel : noop}
        mountContainer={mountContainer}
        destroy
      >
        <div
          className={prefixCls}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`${prefixCls}__header`}>
            <div className={`${prefixCls}__cancel`} onClick={this.onCancel}>
              {cancelText || locale!.cancelText}
            </div>
            <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
            <div className={`${prefixCls}__submit`} onClick={this.onOk}>
              {okText || locale!.okText}
            </div>
          </div>
          <DatePickerView
            {...others}
            className={className}
            value={date}
            onInit={this.onInit}
            onChange={this.onValueChange}
            stopScroll={stopScroll}
          />
        </div>
      </Popup>
    );
  }
}
