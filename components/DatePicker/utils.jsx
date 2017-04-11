
function getFormatter(type) {
  let formatter;
  if (type === 'year') {
    formatter = ('YYYY[年]');
  } else if (type === 'month') {
    formatter = ('YYYY-MM');
  } else if (type === 'time') {
    formatter = ('HH:mm');
  } else if (type === 'datetime') {
    formatter = ('YYYY-MM-DD HH:mm');
  } else {
    formatter = ('YYYY-MM-DD');
  }
  return formatter;
}

export default function formatFn(instance, value) {
  const { format } = instance.props;
  const type = typeof format;

  if (type === 'string') {
    return value.format(format);
  }

  if (type === 'function') {
    return format(value);
  }

  return value.format(getFormatter(instance.props.mode));
}

