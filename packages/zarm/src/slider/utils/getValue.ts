const getValue = (props: { value?: number; defaultValue?: number }, defaultValue: number) => {
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue || defaultValue;
  }
  return defaultValue;
};

export default getValue;
