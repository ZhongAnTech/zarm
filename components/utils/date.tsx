type DateType = 'y' | 'yyyy' | 'm' | 'mm' | 'd' | 'dd';
type DateOrString = Date | string;

export default {
  // 返回月份中的第一天是星期几
  firstDayOfMonth(date: DateOrString) {
    const d = date.constructor === Date ? date : this.cloneDate(date, 'dd', 1);
    return d.getDay();
  },
  // 获取当月天数
  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  },
  // 获取当月天数
  getDaysByDate(date: DateOrString) {
    const tmp = this.parseDate(date);
    return new Date(tmp.getFullYear(), tmp.getMonth() + 1, 0).getDate();
  },

  // 获取当月信息
  getCurrMonthInfo(year: number, month: number) {
    return {
      dayCount: new Date(year, month + 1, 0).getDate(), // 总天数
      firstDay: new Date(year, month, 1).getDay(), // 第一天是周几
    };
  },
  // 判断闰年还是平年
  isLeapYear(year: number | string) {
    if (year === '' || !Number.isSafeInteger(+year)) {
      throw new Error('年份格式不正确');
    }
    year = +year;
    if (year < 1790) {
      throw new Error('年份不能低于1790');
    }
    return (+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0;
  },
  // 获取时间差的月份数
  getMonthCount(date1: DateOrString, date2: DateOrString) {
    const tmp1 = this.parseDate(date1);
    const tmp2 = this.parseDate(date2);
    const dur =
      (tmp2.getFullYear() - tmp1.getFullYear()) * 12 + (tmp2.getMonth() - tmp1.getMonth());
    return Math.abs(dur) + 1;
  },
  // 是否是今天(只判断年月日)
  isToday(date: DateOrString) {
    return this.isOneDay(date, new Date());
  },
  // 两个日期是否同一天
  isOneDay(date1: DateOrString, date2: DateOrString) {
    if (!date1 || !date2) {
      return false;
    }
    const tmp1 = this.parseDate(date1);
    const tmp2 = this.parseDate(date2);
    return tmp1.toDateString() === tmp2.toDateString();
  },
  // 两个日期是否同一个月
  isOneMonth(date1: DateOrString, date2: DateOrString) {
    if (!date1 || !date2) {
      return false;
    }
    const tmp1 = this.parseDate(date1);
    const tmp2 = this.parseDate(date2);
    return tmp1.getFullYear() === tmp2.getFullYear() && tmp1.getMonth() === tmp2.getMonth();
  },
  // 周几
  getDay(date: DateOrString, opt?: ReadonlyArray<string>) {
    const realDate = this.cloneDate(date);
    let array = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    if (opt && opt instanceof Array) {
      array = opt;
    }
    return array[realDate.getDay()];
  },
  // 标准化日期, 时间均为00:00:00
  parseDay(date: DateOrString) {
    const tmp = this.parseDate(date);
    return new Date(tmp.getFullYear(), tmp.getMonth(), tmp.getDate());
  },
  // 标准化时间
  parseDate(date: DateOrString | number): Date {
    if (date.constructor === Date) {
      return date;
    }
    if (date.constructor === String) {
      if (+date) {
        return new Date(+date);
      }
      date = date.replace(/-/gi, '/');
    }
    return new Date(date);
  },
  // 克隆日期
  cloneDate(date: DateOrString, type?: DateType, during?: number) {
    const tmp = new Date(this.parseDate(date));
    if (!type || !during) {
      return tmp;
    }
    switch (type) {
      case 'y':
        tmp.setFullYear(tmp.getFullYear() + during);
        break;
      case 'yyyy':
        tmp.setFullYear(during);
        break;
      case 'm':
        tmp.setMonth(tmp.getMonth() + during);
        break;
      case 'mm':
        tmp.setMonth(during);
        break;
      case 'd':
        tmp.setDate(tmp.getDate() + during);
        break;
      case 'dd':
        tmp.setDate(during);
        break;
      default:
        break;
    }
    return tmp;
  },
};
