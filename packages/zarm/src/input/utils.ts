export function getValue(props, defaultValue: string | number = ''): string | number {
  if (typeof props.value !== 'undefined' && props.value !== null) {
    return props.value;
  }
  if (typeof props.defaultValue !== 'undefined' && props.defaultValue !== null) {
    return props.defaultValue;
  }
  return defaultValue;
}

export function combineRef<T>(...refs: React.Ref<T>[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (typeof ref === 'object' && ref && 'current' in ref) {
        (ref as any).current = node;
      }
    });
  };
}
