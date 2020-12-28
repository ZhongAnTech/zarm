export function getValue(props, defaultValue: string | number = ''): string | number {
  if (typeof props.value !== 'undefined') {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined') {
    return props.defaultValue;
  }
  return defaultValue;
}
