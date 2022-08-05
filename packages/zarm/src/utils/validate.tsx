export const isArray = <T,>(value: T): value is T => {
  return Array.isArray(value);
};

export const isString = <T,>(value: T): value is T => {
  return typeof value === 'string';
};

export const isObject = <T,>(value: T): value is T => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export const isNumber = <T,>(value: T): value is T => {
  return Object.prototype.toString.call(value) === '[object Number]';
};

export const isCascader = ({ dataSource }) => {
  return dataSource && dataSource[0] && !isArray(dataSource[0]);
};

export const isFunction = <T,>(value: T): value is T => typeof value === 'function';
