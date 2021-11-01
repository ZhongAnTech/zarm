export function getValue(props, defaultValue?: string | number) {
  if (typeof props.value !== 'undefined' && props.value !== null) {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined' && props.defaultValue !== null) {
    return props.defaultValue;
  }
  return defaultValue;
}
