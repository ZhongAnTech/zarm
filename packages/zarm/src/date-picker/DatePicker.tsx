import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import DatePickerView, { DatePickerViewInstance } from '../date-picker-view';
import PickerContainer from '../picker/Container';
import { HTMLProps } from '../utils/utilityTypes';
import type { BaseDatePickerProps } from './interface';

export type DatePickerProps = BaseDatePickerProps & HTMLProps;

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    className,
    title,
    confirmText,
    cancelText,
    mountContainer,
    maskClosable = true,
    onConfirm,
    onCancel,
    onChange,
    afterOpen,
    afterClose,
    visible,
    ...rest
  } = props;

  const datePickerViewRef = React.useRef<DatePickerViewInstance>(null);

  const handleChange = (_, items, level) => {
    onChange?.(datePickerViewRef.current?.value!, items, level);
  };

  const handleConfirm = () => {
    onConfirm?.(datePickerViewRef.current?.value!, datePickerViewRef.current?.items);
  };

  const handleCancel = () => {
    onCancel?.();
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
      afterOpen={afterOpen}
      afterClose={afterClose}
    >
      <DatePickerView
        {...rest}
        ref={datePickerViewRef}
        className={className}
        value={props.value}
        onChange={handleChange}
      />
    </PickerContainer>
  );
};

export default DatePicker;
