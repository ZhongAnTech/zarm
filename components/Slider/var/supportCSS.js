/**
 * Created by lvs on 2017/5/12.
 */
import camelCase from './camelCase';

export default function supportCss(css) {
  const _elem = document.createElement('_');
  const styles = window.getComputedStyle(_elem);
  const cssArr = [css, `-webkit-${css}`, `-moz-${css}`, `-o-${css}`, `-ms-${css}`];
  // 有一个支持即可
  let supported = false;
  cssArr.some((elem) => {
    if (camelCase(elem) in styles) {
      supported = elem;
      return true;
    }
    return false;
  });
  return supported;
}
