export const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

export const countSymbols = (text = '') => {
  return text.replace(regexAstralSymbols, '_').length;
};
