/**
 * Created by lvs on 2017/5/12.
 */
import supportCSS from './supportCSS';

const defined_props = {
  transition: supportCSS('transition'),
  transform: supportCSS('transform'),
};

export default function setStyle(dom, styles) {
  if (!dom || dom.nodeType !== 1) {
    return null;
  }
  if (!styles) {
    return dom;
  }
  Object.keys(styles).forEach((key) => {
    const value = styles[key];
    dom.style[defined_props[key] || key] = value;
  });
  return dom;
}
