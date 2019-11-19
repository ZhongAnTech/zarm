const format = {
  // 格式化日期
  date: (date, fmt) => {
    if (!date || !fmt) {
      return date;
    }
    if (date.length === 8) {
      date = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6, 2)}`;
    }
    date = new Date(date.toString().replace(/-/g, '/'));
    const o = {
      'y+': date.getFullYear(), // 年份
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
  },
};

export default format;
