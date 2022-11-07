import dayjs from 'dayjs';
import { MODE } from '../interface';

const formatMap = {
  [MODE.YEAR]: 'YYYY',
  [MODE.MONTH]: 'YYYY-MM',
  [MODE.TIME]: 'HH:mm',
  [MODE.DATETIME]: 'YYY-MM-DD HH:mm',
};
export default function formatFn(props, value?: Date | string) {
  const { format, mode } = props;
  const type = typeof format;
  if (format && type === 'string' && value) {
    return dayjs(value).format(format);
  }

  if (typeof value === 'string') {
    return value;
  }

  if (type === 'function') {
    return format(value) || '';
  }

  const formatStr = formatMap[mode] || 'YYYY-MM-DD';

  return dayjs(value).format(formatStr) || '';
}
