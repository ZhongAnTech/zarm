/* eslint-disable */
export const invertKeyValues = (obj: object, fn?) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc as object;
  }, {});
