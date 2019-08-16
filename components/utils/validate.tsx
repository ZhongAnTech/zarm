export const isArray = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Array]';
};

export const isString = (val: any) => {
  return Object.prototype.toString.call(val) === '[object String]';
};

export const isCascader = ({ dataSource }) => {
  return dataSource && dataSource[0] && !isArray(dataSource[0]);
};
