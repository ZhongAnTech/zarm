import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import PickerContainer from '../picker/Container';
import DatePickerView, { DatePickerInstance } from '../date-picker-view';
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

  const datePickerViewRef = React.useRef<DatePickerInstance>(null);

  const handleCancel = () => {
    onCancel?.();
  };

  const handleConfirm = () => {
    onConfirm?.(datePickerViewRef.current?.value!);
  };

  const onValueChange = (newValue) => {
    onChange?.(newValue);
  };

  const { locale } = useContext(ConfigContext);
  return (
    <PickerContainer
      visible={visible}
      title={title}
      className={className}
      confirmText={confirmText || locale?.DatePicker?.confirmText}
      cancelText={cancelText || locale?.DatePicker?.cancelText}
      maskClosable={maskClosable}
      mountContainer={mountContainer}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleCancel}
      ref={ref}
    >
      <DatePickerView
        {...others}
        className={className}
        value={props.value}
        onChange={onValueChange}
        ref={datePickerViewRef}
      />
    </PickerContainer>
  );
});

DatePicker.defaultProps = {
  mode: 'date',
  minuteStep: 1,
  maskClosable: true,
};

export default DatePicker;
