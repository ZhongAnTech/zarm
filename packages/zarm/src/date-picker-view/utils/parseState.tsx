import dayjs from 'dayjs';
import type { BaseDatePickerViewProps, DatePickerValue } from '../PropsType';

const isExtendDate = (date?: DatePickerValue): Date | '' => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  const isTime = /^\d{1,2}:\d{1,2}$/.test(date);

  if (isTime) {
    const [hour, minute] = date.split(':');
    const today = new Date();
    today.setHours(+hour);
    today.setMinutes(+minute);

    return today;
  }

  return new Date(dayjs(date).format());
};

const parseState = (props: BaseDatePickerViewProps) => {
  const date = props.value && isExtendDate(props.value);
  const defaultDate = props.defaultValue && isExtendDate(props.defaultValue);
  const wheelDefault = props.wheelDefaultValue && isExtendDate(props.wheelDefaultValue);

  return {
    date: date || defaultDate,
    wheelDefault,
  };
};

export { isExtendDate, parseState };
