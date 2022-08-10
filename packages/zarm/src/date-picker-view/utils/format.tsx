import dayjs from 'dayjs';

function getFormatter(type) {
  let formatter;
  if (type === 'year') {
    formatter = 'YYYY';
  } else if (type === 'month') {
    formatter = 'YYYY-MM';
  } else if (type === 'time') {
    formatter = 'HH:mm';
  } else if (type === 'datetime') {
    formatter = 'YYYY-MM-DD HH:mm';
  } else {
    formatter = 'YYYY-MM-DD';
  }
  return formatter;
}

export default function formatFn(props, value) {
  const { format, mode } = props;
  const type = typeof format;
  if (format && type === 'string') {
    return dayjs(value).format(format);
  }

  if (typeof value === 'string') {
    return value;
  }

  if (type === 'function') {
    return format(value) || '';
  }

  return dayjs(value).format(getFormatter(mode)) || '';
}
