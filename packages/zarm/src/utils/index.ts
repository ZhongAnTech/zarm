export const noop = () => {};

export const toArray = <T>(value?: T | T[] | null): T[] => {
  value = value || [];
  return Array.isArray(value) ? value : [value];
};
