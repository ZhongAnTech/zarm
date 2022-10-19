export const resolvedFieldNames = <T = object>(
  left: Partial<T> | undefined,
  right: Required<T>,
) => {
  Object.keys(right).forEach((key) => {
    right[key] = left?.[key] || right[key];
  });
  return right;
};
