import BaseDatePickerViewProps, { DateValue } from '../PropsType';

const isExtendDate = (date?: DateValue): Date | '' => {
  if (date instanceof Date) {
    return date;
  }

  if (!date) {
    return '';
  }

  const isTime = /^\d{2}:\d{2}$/.test(date);
  if (isTime) {
    return new Date(`${new Date().getFullYear()} ${date}`);
  }

  return new Date(date.toString().replace(/-/g, '/'));
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
