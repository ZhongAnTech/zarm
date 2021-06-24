export function getValue(props, defaultValue?: string | number): string {
  if (typeof props.value !== 'undefined' && props.value !== null) {
    return String(props.value);
  }
  if (typeof props.defaultValue !== 'undefined' && props.defaultValue !== null) {
    return String(props.defaultValue);
  }
  return String(defaultValue);
}
