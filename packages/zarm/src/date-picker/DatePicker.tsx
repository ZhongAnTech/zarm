import React, { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import DatePickerView, { DatePickerViewInstance } from '../date-picker-view';
import type { PickerCssVars } from '../picker';
import PickerContainer from '../picker/Container';
import { HTMLProps } from '../utils/utilityTypes';
import type { BaseDatePickerProps } from './interface';

export type DatePickerProps = BaseDatePickerProps & HTMLProps<PickerCssVars>;

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    className,
    style,
    title,
    confirmText,
    cancelText,
    mountContainer,
    maskClosable = true,
    safeArea,
    onConfirm,
    onCancel,
    onChange,
    afterOpen,
    afterClose,
    visible,
    ...rest
  } = props;

  const datePickerViewRef = React.useRef<DatePickerViewInstance>(null);

  const handleChange = (date, items, level) => {
    visible && onChange?.(date, items, level);
  };

  const handleConfirm = () => {
    onConfirm?.(datePickerViewRef.current?.value!, datePickerViewRef.current?.items);
  };

  const handleCancel = () => {
    datePickerViewRef.current?.reset?.();
    onCancel?.();
  };

  const { locale } = useContext(ConfigContext);

  return (
    <PickerContainer
      className={className}
      style={style}
      visible={visible}
      title={title}
      confirmText={confirmText || locale?.DatePicker?.confirmText}
      cancelText={cancelText || locale?.DatePicker?.cancelText}
      maskClosable={maskClosable}
      mountContainer={mountContainer}
      safeArea={safeArea}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleCancel}
      afterOpen={afterOpen}
      afterClose={afterClose}
    >
      <DatePickerView
        {...rest}
        ref={datePickerViewRef}
        value={props.value}
        onChange={handleChange}
      />
    </PickerContainer>
  );
};

export default DatePicker;
