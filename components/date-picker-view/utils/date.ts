export const getGregorianCalendar = (year, month, day, hour, minutes, seconds) => {
  return new Date(year, month, day, hour, minutes, seconds);
};

export const cloneDate = (date) => {
  return new Date(+date);
};

// 获取当月天数
export function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export const setMonth = (date, month) => {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
};

// 补齐格式
export const pad = (n) => {
  return n < 10 ? `0${n}` : n;
};
