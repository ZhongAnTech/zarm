import React, { useState, useContext, useEffect, useCallback } from 'react';
import { ConfigContext } from '../n-config-provider';
import PickerContainer from '../picker/Container';
import DatePickerView from '../date-picker-view';
import { parseState } from '../date-picker-view/utils/parseState';
import type { BaseDatePickerProps } from './interface';
import { HTMLProps } from '../utils/utilityTypes';

export type DatePickerProps = BaseDatePickerProps & HTMLProps;

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const {
    className,
    title,
    confirmText,
    cancelText,
    mountContainer,
    maskClosable,
    onConfirm,
    onCancel,
    onChange,
    visible,
    ...others
  } = props;
  const [state, setState] = useState({ ...parseState(props), stopScroll: false });

  const { date, stopScroll } = state;

  // useEffect(() => {
  //   setState({ ...parseState(props), stopScroll: false });
  // }, [
  //   props.mode,
  //   props.defaultValue,
  //   props.minuteStep,
  //   props.wheelDefaultValue,
  //   props.min,
  //   props.max,
  // ]);

  useEffect(() => {
    if (stopScroll) {
      setState({
        ...state,
        stopScroll: false,
      });
    }
  }, [stopScroll]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  const handleConfirm = useCallback(() => {
    setState({
      ...state,
      stopScroll: true,
    });
    onConfirm?.(date as Date);
  }, [onConfirm, date]);

  const onValueChange = useCallback(
    (newValue) => {
      onChange?.(newValue);
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

  const { locale } = useContext(ConfigContext);

  return (
    <PickerContainer
      visible={visible}
      ref={ref}
      title={title}
      className={className}
      confirmText={confirmText || locale?.DatePicker?.confirmText}
      cancelText={cancelText || locale?.DatePicker?.cancelText}
      maskClosable={maskClosable}
      mountContainer={mountContainer}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleCancel}
    >
      <DatePickerView
        {...others}
        className={className}
        value={props.value}
        onChange={onValueChange}
        stopScroll={stopScroll}
        onInit={handleOnInit}
      />
    </PickerContainer>
  );
});

DatePicker.defaultProps = {
  mode: 'date',
  minuteStep: 1,
  maskClosable: true,
  onCancel: () => {},
};

export default DatePicker;
