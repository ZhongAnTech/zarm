export function flushMicroTasks() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

export const date1 = new Date(1555977600000); // 2019-04-23
export const date2 = new Date(1509692400000); // 2017-11-03 15:00
export const date3 = new Date(1509591600000); // 2017-11-02 11:00
export const date4 = new Date(1509613200000); // 2017-11-02 14:00
export const date5 = new Date(1509703200000); // 2017-11-03 15:00
export const date6 = new Date(1509951600000); // 2017-11-06 12:00
export const date7 = new Date(1525564800000); // 2018-05-06

export function noop() {}
