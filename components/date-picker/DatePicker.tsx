import React, { Component } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import BaseDatePickerProps from './PropsType';
import Popup from '../popup';
import DatePickerView from '../date-picker-view';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import { parseState } from '../date-picker-view/utils/parseState';

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
    maskClosable: true,
    destroy: false,
    onCancel: () => {},
    onInit: () => {},
  };

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']), removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']))) {
      return {
        prevProps: props,
        ...parseState(props),
      };
    }

    if (!_.isEqual(state.value, state.prevValue)) {
      return {
        prevValue: state.value,
        value: state.value,
      };
    }
    return null;
  }

  private initDate;

  private isScrolling = false;

  state = {
    value: '',
  };

  onCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      value: this.initDate,
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
    // const value = this.initDate;

    this.setState({
      value,
    });
    if (typeof onOk === 'function') {
      onOk(value);
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
    // this.initDate = selected;
    this.setState({
      value: selected,
    });
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
    const { prefixCls, className, title, okText, cancelText, locale, getContainer, maskClosable, destroy, onOk, onCancel, onInit, visible, ...others } = this.props;
    const cls = classnames(prefixCls, className);
    const { value } = this.state;
    console.log('datePicker value:', value);
    const noop = () => {};

    return (
      <Popup
        visible={visible}
        onMaskClick={maskClosable ? this.onCancel : noop}
        getContainer={getContainer}
        destroy={destroy}
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
