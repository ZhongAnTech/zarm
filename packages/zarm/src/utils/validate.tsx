export const isArray = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Array]';
};

export const isString = (val: any) => {
  return Object.prototype.toString.call(val) === '[object String]';
};

export const isObject = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Object]';
};

export const isNumber = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Number]';
};

export const isCascader = ({ dataSource }) => {
  return dataSource && dataSource[0] && !isArray(dataSource[0]);
};

export const isFunction = (value: unknown): value is Function => typeof value === 'function';
