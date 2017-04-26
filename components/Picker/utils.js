
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

function isEmptyArray(a) {
  return !a || !a.length;
}

export function formatFn(instance, value) {
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


export function isChildrenEqual(c1, c2, pure) {
  if (isEmptyArray(c1) && isEmptyArray(c2)) {
    return true;
  }
  if (pure) {
    return c1 === c2;
  }
  if (c1.length !== c2.length) {
    return false;
  }
  const len = c1.length;
  for (let i = 0; i < len; i += 1) {
    if (c1[i].value !== c2[i].value || c1[i].label !== c2[i].label) {
      return false;
    }
  }
  return true;
}

export function arrayTreeFilter(data, filterFn, options) {
  options = options || {};
  options.childrenKeyName = options.childrenKeyName || 'children';
  let children = data || [];
  const result = [];
  let level = 0;

  const filterInnerFn = (item) => {
    return filterFn(item, level);
  };

  do {
    const foundItem = children.filter(filterInnerFn)[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = foundItem[options.childrenKeyName] || [];
    level += 1;
  } while (children.length > 0);
  return result;
}
