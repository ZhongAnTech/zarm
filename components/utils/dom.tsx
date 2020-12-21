import raf from 'raf';

export type ContainerType = HTMLElement | (() => HTMLElement) | Window;

// 获取元素的纵坐标（相对于窗口）
export const getTop = (ele) => {
  let offset = ele.offsetTop;
  if (ele.offsetParent != null) {
    offset += getTop(ele.offsetParent);
  }
  return offset;
};

export const getLeft = (ele) => {
  let offset = ele.offsetLeft;
  if (ele.offsetParent != null) {
    offset += getLeft(ele.offsetParent);
  }
  return offset;
};

// 获取元素大小以及相对窗口的位置
export const getBoundingClientRect = (ele) => {
  const rect = ele.getBoundingClientRect();

  // 解决ie下的兼容问题
  const isIE = navigator.userAgent.indexOf('MSIE') !== -1;
  const rectTop = isIE && ele.tagName === 'HTML'
    ? -ele.scrollTop
    : rect.top;

  return {
    left: rect.left,
    top: rectTop,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.right - rect.left,
    height: rect.bottom - rectTop,
  };
};

// 设置元素行内样式
export const setStyle = (ele, styles) => {
  const isNumeric = (n) => {
    return (n !== '' && !Number.isNaN(parseFloat(n)) && Number.isFinite(n));
  };
  Object.keys(styles).forEach((prop) => {
    let unit = '';
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    ele.style[prop] = styles[prop] + unit;
  });
};

// 获取元素css的某一个计算后属性值
export const getStyleComputedProperty = (ele, property: string): string => {
  const css = window.getComputedStyle(ele, null);
  return css[property];
};

// 判断元素是否固定定位或者是否在固定定位元素内
export const isFixed = (ele) => {
  if (ele === window.document.body) {
    return false;
  }
  if (getStyleComputedProperty(ele, 'position') === 'fixed') {
    return true;
  }
  return ele.parentNode ? isFixed(ele.parentNode) : ele;
};

// 获取元素完整尺寸(offset size + margin)
export const getOuterSizes = (ele) => {
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
  return offsetParent === window.document.body || !offsetParent ? window.document.documentElement : offsetParent;
};

// 获取指定元素可滚动的父元素
export const getScrollParent = (ele): HTMLElement => {
  const parent = ele.parentNode;

  if (!parent) {
    return ele;
  }
  if (parent === window.document) {
    if (window.document.body.scrollTop) {
      return window.document.body;
    }
    return window.document.documentElement;
  }
  if (
    ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow')) !== -1
    || ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-x')) !== -1
    || ['scroll', 'auto'].indexOf(getStyleComputedProperty(parent, 'overflow-y')) !== -1
  ) {
    return parent;
  }
  return getScrollParent(ele.parentNode);
};

// 获取浏览器支持的带前缀属性名
export const getSupportedPropertyName = (property) => {
  const prefixes = ['', 'ms', 'webkit', 'moz', 'o'];

  for (let i = 0; i < prefixes.length; i++) {
    const toCheck = prefixes[i] ? prefixes[i] + property.charAt(0).toUpperCase() + property.slice(1) : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
};

// 获取元素scrollTop
export const getScrollTop = (ele: HTMLElement | Window): number => {
  if (ele === document.documentElement) {
    return (document.scrollingElement || document.documentElement).scrollTop;
  }
  if (ele === window) {
    return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
  }
  return (ele as HTMLElement).scrollTop;
};

export const getScrollLeft = (ele: HTMLElement | Window): number => {
  if (ele === document.documentElement) {
    return (document.scrollingElement || document.documentElement).scrollLeft;
  }
  if (ele === window) {
    return Math.max(window.pageYOffset, document.documentElement.scrollLeft, document.body.scrollLeft);
  }
  return (ele as HTMLElement).scrollLeft;
};

// 获取装载容器
export const getMountContainer = (mountContainer?: ContainerType): HTMLElement => {
  if (mountContainer) {
    if (typeof mountContainer === 'function') {
      return mountContainer();
    }
    if (
      typeof mountContainer === 'object'
      && mountContainer instanceof HTMLElement
    ) {
      return mountContainer;
    }
  }
  return document.body;
};

// 获取滚动容器
export const getScrollContainer = (mountContainer?: ContainerType): HTMLElement | Window => {
  const container = getMountContainer(mountContainer);
  return container === document.body
    ? window
    : container;
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

  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  function animate() {
    if (scrollContainer === window) {
      const x = getScrollLeft(scrollContainer) + (left - fromLeft) / frames;
      const y = getScrollTop(scrollContainer) + (top - fromTop) / frames;
      scrollContainer.scrollTo(x, y);
    } else {
      (scrollContainer as HTMLElement).scrollLeft += (left - fromLeft) / frames;
      (scrollContainer as HTMLElement).scrollTop += (top - fromTop) / frames;
    }
    count += 1;
    if (count < frames) {
      scrollRafId = raf(animate);
      scrollList[scrollRafId] = scrollContainer;
    }
  }

  animate();
}

export const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
