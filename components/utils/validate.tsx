export const isArray = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Array]';
};
