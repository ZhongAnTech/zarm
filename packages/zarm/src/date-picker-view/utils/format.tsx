function getFormatter(type) {
  let formatter;
  if (type === 'year') {
    formatter = 'yyyy年';
  } else if (type === 'month') {
    formatter = 'yyyy-MM';
  } else if (type === 'time') {
    formatter = 'HH:mm';
  } else if (type === 'datetime') {
    formatter = 'yyyy-MM-dd HH:mm';
  } else {
    formatter = 'yyyy-MM-dd';
  }
  return formatter;
}

function formatDate(date, fmt) {
  if (!date || !fmt) {
    return date;
  }

  // date = new Date(date.toString().replace(/-/g, '/'));

  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  });
  return fmt;
}

export default function formatFn(instance, value) {
  const { format } = instance.props;
  const type = typeof format;
  if (format && type === 'string') {
    return formatDate(value, format) || '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (type === 'function') {
    return format(value) || '';
  }

  return formatDate(value, getFormatter(instance.props.mode)) || '';
  // return value.format(getFormatter(instance.props.mode));
}
