/* eslint-disable operator-linebreak */
import raf from 'raf';
import { StringPropertyNames } from '../utilityTypes';

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  window.document &&
  window.document.createElement
);

// 获取元素的纵坐标（相对于窗口）
export const getTop = (ele: HTMLElement): number => {
  let offset = ele.offsetTop;
  if (ele.offsetParent != null) {
    offset += getTop(ele.offsetParent as HTMLElement);
  }
  return offset;
};

export const getLeft = (ele: HTMLElement) => {
  let offset = ele.offsetLeft;
  if (ele.offsetParent != null) {
    offset += getLeft(ele.offsetParent as HTMLElement);
  }
  return offset;
};

// 获取元素大小以及相对窗口的位置
export const getBoundingClientRect = (
  ele: Element,
): Omit<DOMRectReadOnly, 'x' | 'y' | 'toJSON'> => {
  const rect = ele.getBoundingClientRect();

  // 解决ie下的兼容问题
  const isIE = navigator.userAgent.indexOf('MSIE') !== -1;
  const rectTop = isIE && ele.tagName === 'HTML' ? -ele.scrollTop : rect.top;
  return {
    left: rect.left,
    top: rectTop,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rectTop,
  };
};


/**
 * 获取元素size
 */
export const getOffsetSize = (ele: HTMLElement) => {
  const rect = getBoundingClientRect(ele);

  if (rect.width && rect.height) {
    return rect;
  }

  const { offsetWidth, offsetHeight } = ele;

  if (offsetWidth && offsetHeight) {
    return { width: offsetWidth, height: offsetHeight };
  }

  return { width: 0, height: 0 };
}

export const isNumeric = (n: any): boolean => {
  return n !== '' && !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
};

// 设置元素行内样式
export const setStyle = (ele: HTMLElement, styles: { [prop: string]: string | number }) => {
  Object.keys(styles).forEach((prop) => {
    let unit = '';
    if (
      ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 &&
      isNumeric(styles[prop])
    ) {
      unit = 'px';
    }
    ele.style[prop] = styles[prop] + unit;
  });
};

// 获取元素css的某一个计算后属性值
type Property = StringPropertyNames<CSSStyleDeclaration>;
export const getStyleComputedProperty = (ele: Element, property: Property): string => {
  const css = window.getComputedStyle(ele, null);
  return css[property];
};

// 判断元素是否固定定位或者是否在固定定位元素内
export const isFixed = (ele): boolean => {
  if (ele === window.document.body) {
    return false;
  }
  if (getStyleComputedProperty(ele, 'position') === 'fixed') {
    return true;
  }
  if (ele.parentNode) {
    return isFixed(ele.parentNode);
  }
  return false;
};

// 获取元素完整尺寸(offset size + margin)
export const getOuterSizes = (ele) => {
  if (!ele) {
    return {
      width: 0,
      height: 0,
    };
  }
  const _display = ele.style.display;
  const _visibility = ele.style.visibility;
  ele.style.display = 'block';
  ele.style.visibility = 'hidden';
  // const calcWidthToForceRepaint = e.offsetWidth;

  const styles = window.getComputedStyle(ele);
  const x = parseFloat(styles.marginTop as string) + parseFloat(styles.marginBottom as string);
  const y = parseFloat(styles.marginLeft as string) + parseFloat(styles.marginRight as string);
  const result = {
    width: ele.offsetWidth + y,
    height: ele.offsetHeight + x,
  };

  // reset
  ele.style.display = _display;
  ele.style.visibility = _visibility;
  return result;
};

// 获取元素的offsetParent
export const getOffsetParent = (ele) => {
  const { offsetParent } = ele;
  return offsetParent === window.document.body || !offsetParent
    ? window.document.documentElement
    : offsetParent;
};

type ScrollElement = HTMLElement | Window;

const overflowScrollReg = /scroll|auto/i;
const defaultRoot = canUseDOM ? window : undefined;

function isElement(node: Element) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
}

// 获取指定元素可滚动的父元素
export const getScrollParent = (
  element: Element,
  root: ScrollElement | undefined = defaultRoot,
) => {
  let node = element;

  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode as Element;
  }

  return root;
};

// 获取浏览器支持的带前缀属性名
export const getSupportedPropertyName = (property) => {
  const prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

  for (let i = 0; i < prefixes.length; i++) {
    const toCheck = prefixes[i]
      ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1)
      : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
};

// 获取元素scrollTop
export const getScrollTop = (element: HTMLElement | Window | Document): number => {
  if (element === document) {
    return (element.scrollingElement || element.documentElement).scrollTop;
  }
  if (element === window) {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
  }
  return (element as HTMLElement).scrollTop;
};

export const getScrollLeft = (ele: HTMLElement | Window): number => {
  if (ele === document.documentElement) {
    return (document.scrollingElement || document.documentElement).scrollLeft;
  }
  if (ele === window) {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollLeft,
      document.body.scrollLeft,
    );
  }
  return (ele as HTMLElement).scrollLeft;
};

// export const scrollTo = (scrollContainer: HTMLElement | Window, scrollTop: number): void => {
//   if (scrollContainer === window) {
//     scrollContainer.scrollTo(0, scrollTop);
//   } else {
//     (scrollContainer as HTMLElement).scrollTop = scrollTop;
//   }
// };

let scrollRafId: number;
const scrollList: { [key: number]: HTMLElement | Window } = {};

export function scrollTo(
  scrollContainer: HTMLElement | Window,
  top: number,
  left: number,
  duration: number,
) {
  if ('scrollBehavior' in document.documentElement.style) {
    scrollContainer.scrollTo({
      top,
      left,
      behavior: 'smooth',
    });
    return false;
  }
  if (scrollList?.[scrollRafId] === scrollContainer) {
    raf.cancel(scrollRafId);
  }

  let count = 0;
  let fromLeft = 0;
  let fromTop = 0;

  if (scrollContainer === window) {
    fromLeft = getScrollLeft(scrollContainer);
    fromTop = getScrollTop(scrollContainer);
  } else {
    fromLeft = (scrollContainer as HTMLElement).scrollLeft;
    fromTop = (scrollContainer as HTMLElement).scrollTop;
  }
  const frames = duration === 0 ? 1 : Math.ceil((duration * 1000) / 16);
  let x = fromLeft;
  let y = fromTop;
  function animate() {
    if (scrollContainer === window) {
      x += (left - fromLeft) / frames;
      y += (top - fromTop) / frames;
      scrollContainer.scrollTo(x, y);
    } else {
      (scrollContainer as HTMLElement).scrollLeft += (left - fromLeft) / frames;
      (scrollContainer as HTMLElement).scrollTop += (top - fromTop) / frames;
    }
    count += 1;
    if (count <= frames) {
      scrollRafId = raf(animate);
      scrollList[scrollRafId] = scrollContainer;
    }
  }

  animate();
}

export function getElementSize(element: HTMLElement | null): { width: number; height: number } {
  if (element) {
    const { offsetWidth, offsetHeight } = element;

    if (offsetWidth && offsetHeight) {
      return { width: offsetWidth, height: offsetHeight };
    }

    const style = getComputedStyle(element);
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);

    if (height && width) {
      return { width, height };
    }
  }

  return { width: 0, height: 0 };
}
