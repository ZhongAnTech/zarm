import React, { useContext, useState } from 'react';
import { ConfigContext } from '../n-config-provider';
import Popup from '../popup';
import DatePickerView from '../date-picker-view';
import { parseState } from '../date-picker-view/utils/parseState';
import type { BaseDatePickerProps } from './interface';

export type DatePickerProps = BaseDatePickerProps & React.HTMLAttributes<HTMLElement>;

const noop = () => {};

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
    onInit,
    visible,
    onChange,
    ...others
  } = props;

  const [date, setDate] = useState<{ date: any; wheelDefault: any }>(parseState(props));

  const [stopScroll, setStopScroll] = useState(false);

  const { prefixCls: globalPrefixCls, locale: globalLocal } = useContext(ConfigContext);
  const prefixCls = `${globalPrefixCls}-date-picker`;
  // const cls = classnames(prefixCls, className);
  const locale = globalLocal?.DatePicker;

  const onDatePickerOk = () => {
    setStopScroll(() => {
      setStopScroll(() => {
        if (typeof onOk === 'function') {
          onOk(date.date);
        }

        return false;
      });

      return true;
    });
  };

  const onDatePickerViewInit = (selected) => {
    setDate((preState) => ({ ...preState, date: selected }));
  };

  const onValueChange = (newValue) => {
    setDate((preState) => ({ ...preState, date: newValue }));

    if (typeof onChange === 'function') {
      onChange(newValue);
    }
  };

  return (
    <Popup
      className={className}
      visible={visible}
      onMaskClick={maskClosable ? onCancel : noop}
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
          <div className={`${prefixCls}__cancel`} onClick={onCancel}>
            {cancelText || locale!.cancelText}
          </div>
          <div className={`${prefixCls}__title`}>{title || locale!.title}</div>
          <div className={`${prefixCls}__submit`} onClick={onDatePickerOk}>
            {okText || locale!.okText}
          </div>
        </div>
        <DatePickerView
          {...others}
          className={className}
          value={date.date}
          onInit={onDatePickerViewInit}
          onChange={onValueChange}
          stopScroll={stopScroll}
        />
      </div>
    </Popup>
  );
};

DatePicker.defaultProps = {
  mode: 'date',
  minuteStep: 1,
  valueMember: 'value',
  maskClosable: true,
  onCancel: () => {},
  onInit: () => {},
};

export default DatePicker;
