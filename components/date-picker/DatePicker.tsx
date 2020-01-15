import React, { Component } from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import BaseDatePickerProps from './PropsType';
import Popup from '../popup';
import removeFnFromProps from '../picker-view/utils/removeFnFromProps';
import DatePickerView from '../date-picker-view';
import { parseState } from '../date-picker-view/utils/parseState';

export interface DatePickerProps extends BaseDatePickerProps {
  prefixCls?: string;
  className?: string;
}

export default class DatePicker extends Component<DatePickerProps, any> {
  static defaultProps = {
    mode: 'date',
    minuteStep: 1,
    prefixCls: 'za-date-picker',
    valueMember: 'value',
    maskClosable: true,
    destroy: false,
    onCancel: () => {},
    onInit: () => {},
  };

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(removeFnFromProps(props, ['onOk', 'onCancel', 'onChange']), removeFnFromProps(state.prevProps, ['onOk', 'onCancel', 'onChange']))) {
      return {
        prevProps: props,
        ...parseState(props),
      };
    }
    return null;
  }

  private isScrolling = false;

  constructor(props) {
    super(props);
    this.state = parseState(props);
  }

  onCancel = () => {
    const { onCancel } = this.props;
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  onOk = () => {
    if (this.isScrolling) {
      return false;
    }

    const { onOk } = this.props;
    const { date } = this.state;

    this.setState({
      date,
    });
    if (typeof onOk === 'function') {
      onOk(date);
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
    const { prefixCls, className, title, okText, cancelText, locale, getContainer, maskClosable, onOk, onCancel, onInit, visible, ...others } = this.props;
    const cls = classnames(prefixCls, className);
    const { date } = this.state;
    const noop = () => {};

    return (
      <Popup
        visible={visible}
        onMaskClick={maskClosable ? this.onCancel : noop}
        getContainer={getContainer}
        destroy
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
            value={date}
            onInit={this.onInit}
            onChange={this.onValueChange}
            onTransition={(isScrolling) => { this.onTransition(isScrolling); }}
          />
        </div>
      </Popup>
    );
  }
}
