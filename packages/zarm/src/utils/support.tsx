/* eslint-disable import/prefer-default-export */
export const isSupportCSSVariable =
  window.CSS && window.CSS.supports && window.CSS.supports('--a', '0');
