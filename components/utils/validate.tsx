export const isArray = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Array]';
};

export const isCascader = ({ dataSource }) => {
  return dataSource && dataSource[0] && !isArray(dataSource[0]);
};
