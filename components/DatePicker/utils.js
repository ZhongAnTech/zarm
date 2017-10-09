
function getFormatter(type) {
  let formatter;
  if (type === 'year') {
    formatter = ('yyyy年');
  } else if (type === 'month') {
    formatter = ('yyyy-MM');
  } else if (type === 'time') {
    formatter = ('HH:mm');
  } else if (type === 'datetime') {
    formatter = ('yyyy-MM-dd HH:mm');
  } else {
    formatter = ('yyyy-MM-dd');
  }
  return formatter;
}

function formatDate(date, fmt) {
  if (!date || !fmt) {
    return date;
  }

  date = new Date(date.toString().replace(/-/g, '/'));

  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
  });
  return fmt;
}

export function formatFn(instance, value) {
  const { format } = instance.props;
  const type = typeof format;

  if (type === 'string') {
    return formatDate(value, format);
  }

  if (type === 'function') {
    return format(value);
  }

  return formatDate(value, getFormatter(instance.props.mode));
  // return value.format(getFormatter(instance.props.mode));
}

function isEmptyArray(a) {
  return !a || !a.length;
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

export function formatToInit(data, member, cols) {
  let _data = data || [];
  const result = [];
  let level = 0;

  while (_data) {
    const foundValue = _data[member];

    if (!foundValue) {
      break;
    }

    if (cols && level >= cols) {
      break;
    }

    result.push(foundValue);
    if (Object.prototype.hasOwnProperty.call(_data, 'children')) {
      _data = _data.children[0];
    } else {
      break;
    }
    level += 1;
  }

  return result;
}

const filterValue = (dataSource, value, member, level) => {
  return dataSource.filter(item => (
    item[member] === value[level]
  ))[0];
};

export function formatBackToObject(data, value, cascade, member, cols) {
  if (!cascade) {
    const result = data.map((item, index) => (
      item.filter(itemInner => (
        itemInner[member] === value[index]
      ))[0]
    ));
    return value.length === 1 ? result[0] : result;
  }

  let _data = data || [];
  const result = [];
  let level = 0;

  while (_data) {
    const curValue = filterValue(_data, value, member, level);
    if (!curValue) {
      break;
    }

    if (cols && level >= cols) {
      break;
    }

    result.push(curValue);
    if (Object.prototype.hasOwnProperty.call(curValue, 'children')) {
      _data = curValue.children;
    } else {
      break;
    }
    level += 1;
  }
  return result;
}

export function isArray(data) {
  return Object.prototype.toString.call(data) === '[object Array]';
}

export function hasChildrenObject(data) {
  return Object.prototype.hasOwnProperty.call(data, 'children') && Object.prototype.toString.call(data.children) !== '[object String]';
}
