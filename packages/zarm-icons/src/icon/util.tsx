function decamelize(str: string, separator = '-'): string {
  const split = /(?=[A-Z])/;
  return str.split(split).join(separator).toLowerCase();
}

export default decamelize;
