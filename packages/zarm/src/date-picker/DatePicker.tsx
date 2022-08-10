import React, { useState, useContext, useEffect, useCallback } from 'react';
import { createBEM } from '@zarm-design/bem';
import Popup from '../popup';
import DatePickerView from '../date-picker-view';
import { parseState } from '../date-picker-view/utils/parseState';
import type { BaseDatePickerProps } from './interface';
import { ConfigContext } from '../n-config-provider';
import { HTMLProps } from '../utils/utilityTypes';

export type DatePickerProps = BaseDatePickerProps & HTMLProps;

const DatePicker = (props: DatePickerProps) => {
  const {
    className,
    title,
    okText,
    cancelText,
    mountContainer,
    maskClosable,
    onOk,
    onCancel,
    onChange,
    visible,
    ...others
  } = props;
  const [state, setState] = useState({ ...parseState(props), stopScroll: false });

  const { date, stopScroll } = state;
  const noop = () => {};

  useEffect(() => {
    setState({ ...parseState(props), stopScroll: false });
  }, [
    props.mode,
    props.defaultValue,
    props.minuteStep,
    props.wheelDefaultValue,
    props.min,
    props.max,
  ]);

  useEffect(() => {
    if (stopScroll) {
      setState({
        ...state,
        stopScroll: false,
      });
    }
  }, [stopScroll]);

  const handleCancel = useCallback(() => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  }, [onCancel]);

  const handleOnOk = useCallback(() => {
    setState({
      ...state,
      stopScroll: true,
    });
    if (typeof onOk === 'function') {
      onOk(date as Date);
    }
  }, [onOk, date]);

  const onValueChange = useCallback(
    (newValue) => {
      setState({
        ...state,
        date: newValue,
      });

      if (typeof onChange === 'function') {
        onChange(newValue);
      }
    },
    [onChange],
  );

  const handleOnInit = useCallback(
    (selected) => {
      setState({
        ...state,
        date: selected,
      });
    },
    [state],
  );

  const { prefixCls, locale } = useContext(ConfigContext);

  const bem = createBEM('date-picker', { prefixCls });

  return (
    <Popup
      className={className}
      visible={visible}
      onMaskClick={maskClosable ? handleCancel : noop}
      mountContainer={mountContainer}
      destroy
    >
      <div
        className={prefixCls}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={bem('header')}>
          <div className={bem('cancel')} onClick={handleCancel}>
            {cancelText || locale?.DatePicker?.cancelText}
          </div>
          <div className={bem('title')}>{title || locale?.DatePicker?.title}</div>
          <div className={bem('submit')} onClick={handleOnOk}>
            {okText || locale?.DatePicker?.okText}
          </div>
        </div>
        <DatePickerView
          {...others}
          className={className}
          value={date}
          onChange={onValueChange}
          stopScroll={stopScroll}
          onInit={handleOnInit}
        />
      </div>
    </Popup>
  );
};

DatePicker.defaultProps = {
  mode: 'date',
  minuteStep: 1,
  maskClosable: true,
  onCancel: () => {},
};

export default DatePicker;
